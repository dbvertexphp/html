const axios = require('axios');
const sha256 = require('sha256');
const TransactionModel = require('../Models/Transaction.model');
const TestDriveModel = require('../Models/TestDrive.model');
const BookingModel = require('../Models/Booking.model');
const CarModel = require('../Models/Car.model');
const { TestDriveBookingUser } = require('../Email/TestDriveTemplates/TestDriveBookingUser');
const CustomerModel = require('../Models/Customer.model');
const {
  BookingSuccessAdvanceCustomer,
  BookingSuccessAdvanceAdmin,
  BookingSuccessFullCustomer,
  BookingSuccessFullAdmin
} = require('../Email/BookingTemplates/BookingTemplates');
const SendMail = require('../Config/Sendmail');
const { TestDriveBookingAdmin } = require('../Email/TestDriveTemplates/TestDriveBookingAdmin');
require('dotenv').config();

let apiUrl = process.env.PHONEPE_API_URL;
let merchantId = process.env.PHONEPE_MERCHANT_ID;
let saltkey = process.env.PHONEPE_SALT_KEY;
let merchantPhone = process.env.PHONEPE_MOBILE_NUMBER;

let redirectUrl = process.env.PHONEPE_REDIRECT_URL;
let redirectAppUrl = process.env.PHONEPE_REDIRECT_APP_URL;

exports.PhonepePaymentInitiater = async (req, res, transactionId, userID, amount_to_pay, params) => {

  if (!amount_to_pay) {
    return res.status(401).send({ url: null, message: 'Amount must be greater than Zero', success: false });
  }

  let payload = {
    merchantId: merchantId,
    merchantTransactionId: transactionId,
    merchantUserId: userID,
    amount: amount_to_pay * 100,
    redirectUrl: `${redirectUrl}?${params}`,
    redirectMode: 'POST',
    callbackUrl: `${redirectUrl}?${params}`,
    mobileNumber: merchantPhone,
    paymentInstrument: {
      type: 'PAY_PAGE'
    }
  };
  const base64Data = Buffer.from(JSON.stringify(payload)).toString('base64');

  let saltIndex = 1;
  let string = sha256(base64Data + '/pg/v1/pay' + saltkey) + '###' + saltIndex;

  let headers = {
    'Content-Type': 'application/json',
    'X-VERIFY': string
  };
  let response = await axios.post(apiUrl, { request: base64Data }, { headers });
  if (response?.data?.success) {
    return res.status(200).send({ url: response?.data?.data?.instrumentResponse?.redirectInfo?.url, message: 'Payment Initiated', success: true });
  } else {
    return res.status(500).send({ url: null, message: 'PhonePe Server Error', success: false });
  }
};
exports.PhonePeCallbackHandler = async (req, res) => {
  try {
    const { code, transactionId } = req.body;
    console.log({ code, transactionId });

    let transaction = await TransactionModel.findById(transactionId);

    if (!transaction) {
      return res.status(401).redirect(`${redirectAppUrl}/payment-failed`);
    }

    const { transaction_type, car_id, test_drive_id } = transaction;

    if (code === 'PAYMENT_SUCCESS') {
      await TransactionModel.findByIdAndUpdate(transactionId, { status: code });

      if (transaction_type === 'Test Drive Booking') {
        const newTD = new TestDriveModel(req.query);
        await newTD.save();

        SendMail({
          recipientEmail: newTD?.email,
          subject: 'Test Drive Created',
          html: TestDriveBookingUser(newTD)
        });

        SendMail({
          recipientEmail: '',
          subject: 'New Test Drive Booked',
          html: TestDriveBookingAdmin({ TestDrive: newTD })
        });

        return res.status(200).redirect(`${redirectAppUrl}/payment-success?carId=${car_id}`);
      } else if (transaction_type === 'Booking Car 10% Pay') {
        let car = await CarModel.findOne({ _id: car_id });
        car.booking_status = 'booked';
        car.payment_status = 'partially_paid';
        car.booking_code = req.query?.booking_code;
        req.query.payment_status = 'partially_paid';

        await CarModel.findByIdAndUpdate(req.query.car_id, car);

        let newBooking = new BookingModel(req.query);
        let customer = await CustomerModel.findById(newBooking?.customer_id);

        customer?.email &&
          SendMail({
            recipientEmail: customer?.email,
            subject: 'Booking Advance Payment Received',
            html: BookingSuccessAdvanceCustomer(car, customer)
          });

        SendMail({
          recipientEmail: '',
          subject: 'Booking Advance Payment Received',
          html: BookingSuccessAdvanceAdmin(car)
        });

        await newBooking.save();
        return res.status(200).redirect(`${redirectAppUrl}/payment-success?carId=${car_id}`);
      } else {
        await CarModel.findByIdAndUpdate(car_id, { booking_status: 'sold', payment_status: 'paid' });

        let car = await CarModel.findById(car_id);
        let booking = await BookingModel.findByIdAndUpdate(req.query.booking_id, {
          remaining_amount: 0,
          payment_status: 'paid'
        });

        let customer = await CustomerModel.findById(booking?.customer_id);

        customer?.email &&
          SendMail({
            recipientEmail: customer?.email,
            subject: 'Booking Full Payment Received',
            html: BookingSuccessFullCustomer(car, customer)
          });

        SendMail({
          recipientEmail: '',
          subject: 'Booking Full Payment Received',
          html: BookingSuccessFullAdmin(car, customer)
        });

        return res.status(200).redirect(`${redirectAppUrl}/payment-success?carId=${car_id}`);
      }
    } else {
      await TransactionModel?.findByIdAndUpdate(transactionId, { status: code });
      await TestDriveModel?.findByIdAndDelete(test_drive_id);
      return res.status(401).redirect(`${redirectAppUrl}/payment-failed`);
    }
  } catch (error) {
    console.error(error);
    return res.status(401).redirect(`${redirectAppUrl}/payment-failed`);
  }
};
