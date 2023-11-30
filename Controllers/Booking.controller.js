const { getUniqueBookingCode } = require("../Middlewares/getUniqueCode")
const BookingModel = require("../Models/Booking.model")
const TransactionModel = require("../Models/Transaction.model");
const { PhonepePaymentInitiater } = require("./PhonePe.controller");
const SetDatesFilter = require("../Config/SetDatesFilter");

let populateArr = ["car_id", "test_drive_id", "customer_id", "vendor_id"]
let populateObj = {
    path: 'car_id', populate: [
        { path: 'name', model: 'CarNameModel', },
        { path: 'make', model: 'Brand' },
        { path: 'model', model: 'CarModel' },
    ]
}

exports.getAllBookings = async (req, res) => {

    const { filterByDays, search } = req.query;

    let limit = req.query.limit || 10
    let page = req.query.page || 1
    page = page > 0 ? page : 1
    let skip = (page - 1) * limit || 0

    let fromDate = req.query.fromDate || "2023-01-01";
    let toDate = req.query.toDate || "2023-12-31";
    try {
        let query = {};
        if (search) query.customer_name = { $regex: search, $options: "i" }
        if (filterByDays) {
            let { startDate, endDate } = SetDatesFilter(filterByDays, fromDate, toDate)
            query.createdAt = { $gte: startDate, $lte: endDate };
        }
        const bookings = await BookingModel.find(query)
            .populate(populateArr).populate(populateObj)
            .sort({ createdAt: -1 }).limit(limit).skip(skip);
        const totalbookings = await BookingModel.find().count()
        return res.status(200).send({ message: "All Bookings", bookings, Count: bookings.length, totalbookings });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: "Something Went Wrong", error });
    }
}

exports.getBookingsByUserID = async (req, res) => {
    const id = req?.params?.id;
    try {
        const bookings = await BookingModel.find({ customer_id: id }).populate(populateArr).populate(populateObj)
        if (!bookings.length) {
            return res.status(400).send({ message: "No Booking Found with this ID" });
        }
        return res.status(200).send({ message: `Bookings with User ID ${id}`, bookings });
    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: "Something Went Wrong", error });
    }
}

exports.getBookingsByVendorID = async (req, res) => {

    const id = req?.params?.id;
    const { filterByDays } = req.query;
    let limit = req.query.limit || 10
    let page = req.query.page || 1
    page = page > 0 ? page : 1
    let skip = (page - 1) * limit || 0

    let fromDate = req.query.fromDate || "2023-01-01";
    let toDate = req.query.toDate || "2023-12-31";
    try {
        let query = { vendor_id: id };

        if (filterByDays) {
            let { startDate, endDate } = SetDatesFilter(filterByDays, fromDate, toDate);
            query.createdAt = { $gte: startDate, $lte: endDate };
        }

        const bookings = await BookingModel.find(query).populate(populateArr).populate(populateObj).sort({ createdAt: -1 }).limit(limit).skip(skip);
        const totalbookings = await BookingModel.find().count()
        return res.status(200).send({ message: "All Bookings", bookings, Count: bookings.length, totalbookings });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: "Something Went Wrong", error });
    }
}

exports.getBookingsByCarID = async (req, res) => {
    const id = req?.params?.id;
    try {
        const bookings = await BookingModel.find({ car_id: id })
        return res.status(200).send({ message: `Bookings with Car ID ${id}`, bookings });
    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: "Something Went Wrong", error });
    }
}
exports.getBookingByID = async (req, res) => {
    const id = req?.params?.id;
    try {
        const booking = await BookingModel.findById(id)
        if (!booking) {
            return res.status(400).send({ message: "No Booking Found with this ID" });
        }
        return res.status(200).send({ message: `Booking with ${id}`, booking });
    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: "Something Went Wrong", error });
    }
}

exports.UpdateBookingByID = async (req, res) => {
    const id = req?.params?.id;
    const payload = req?.body;
    payload.booking_id = id
    try {
        let booking = await BookingModel.findById(id)
        if (payload?.car_status == "sold") {
            let newTransaction = {
                customer_name: booking.customer_name,
                customer_id: payload?.customer_id,
                test_drive_id: payload?.test_drive_id,
                car_id: payload?.car_id,
                reference_id: "string",
                status: "PAYMENT_ERROR",
                transaction_type: "Booking Car 90% Pay",
                amount_to_pay: payload?.amount_to_pay,
            }

            const transaction = new TransactionModel(newTransaction)
            await transaction.save()

            let params = new URLSearchParams(payload)

            await PhonepePaymentInitiater(req, res, transaction?._id, payload.customer_id, payload.amount_to_pay, params)
        } else {

            await BookingModel.findByIdAndUpdate(id, payload);
            return res.status(200).send({ message: "Booking Updated Successfully" });
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: "something went wrong", error })
    }
}

exports.addBooking = async (req, res) => {
    let payload = req?.body;
    payload.booking_code = await getUniqueBookingCode()


    try {
        let newTransaction = {
            customer_name: payload.customer_name,
            customer_id: payload.customer_id,
            test_drive_id: payload.test_drive_id,
            car_id: payload.car_id,
            reference_id: "string",
            status: "PAYMENT_ERROR",
            transaction_type: "Booking Car 10% Pay",
            amount_to_pay: payload?.amount_to_pay,
        }

        const transaction = new TransactionModel(newTransaction)
        await transaction.save()

        let params = new URLSearchParams(payload)

        await PhonepePaymentInitiater(req, res, transaction?._id, payload.customer_id, payload.amount_to_pay, params)

    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: "Something Went Wrong", error });
    }
}

exports.deleteBookingByID = async (req, res) => {
    let id = req?.params?.id
    try {
        const Booking = await BookingModel.findByIdAndDelete(id)
        if (!Booking) {
            return res.status(400).send({ message: "No User Found with this id" })
        }
        return res.status(200).send({ message: "Booking Deleted Successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: error?.message || "Something went Wrong", error });
    }
};
