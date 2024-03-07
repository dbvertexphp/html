const BookingModel = require('../Models/Booking.model');
const CarModel = require('../Models/Car.model');
const CustomerModel = require('../Models/Customer.model');
const EmployeeModel = require('../Models/EmployeeModel');
const TestDriveModel = require('../Models/TestDrive.model');
const TransactionModel = require('../Models/Transaction.model');
const VendorModel = require('../Models/Vendor.model');

const DateConvertTimeZone = (fromDates, toDates) => {
  let fromDate = new Date(fromDates);
  let toDate = new Date(toDates);

  fromDate = new Date(Date.UTC(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate()));
  toDate = new Date(Date.UTC(toDate.getFullYear(), toDate.getMonth(), toDate.getDate(), 23, 59, 59, 999));

  return { fromDate, toDate };
};

exports.getTransactionReport = async (req, res) => {
  // Static date range
  let fromDates = req.query.fromDate;
  let toDates = req.query.toDate;

  const convertedDates = DateConvertTimeZone(fromDates, toDates);
  console.log(convertedDates);

  let fromDate = convertedDates.fromDate;
  let toDate = convertedDates.toDate;

  let transaction_type = req.query.transactionType || '';
  let status = req.query.status;

  try {
    let query = {};
    if (fromDate && toDate) {
      query.createdAt = { $gte: fromDate, $lte: toDate };
    }
    if (transaction_type) {
      query.transaction_type = transaction_type;
    }
    if (status) {
      query.status = status;
    }

    const transactions = await TransactionModel.find(query)
      .populate(['car_id', 'test_drive_id', 'customer_id', 'car_id.vendorID'])
      .populate({
        path: 'car_id',
        populate: [
          { path: 'name', model: 'CarNameModel' },
          { path: 'make', model: 'Brand' },
          { path: 'model', model: 'CarModel' },
          { path: 'vendorID', model: 'Vendor' }
        ]
      })
      .sort({ updated_at: 'desc' });

    return res.status(200).send({ message: `Transaction Report Data`, transactions });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error.message || 'Something went Wrong', error });
  }
};

exports.getBookingReport = async (req, res) => {
  let fromDates = req.query.fromDate;
  let toDates = req.query.toDate;

  const convertedDates = DateConvertTimeZone(fromDates, toDates);
  console.log(convertedDates);

  let fromDate = convertedDates.fromDate;
  let toDate = convertedDates.toDate;
  try {
    let query = {};
    if (fromDate && toDate) {
      query.createdAt = { $gte: fromDate, $lte: toDate };
    }
    const bookings = await BookingModel.find(query)
      .populate(['car_id', 'test_drive_id', 'customer_id', 'vendor_id'])
      .populate({
        path: 'car_id',
        populate: [
          { path: 'name', model: 'CarNameModel' },
          { path: 'make', model: 'Brand' },
          { path: 'model', model: 'CarModel' },
          { path: 'vendorID', model: 'Vendor' }
        ]
      })
      .sort({ updated_at: 'desc' });
    return res.status(200).send({ message: `Booking Report Data`, bookings });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error.message || 'Something went Wrong', error });
  }
};

exports.getCarReport = async (req, res) => {
  let fromDates = req.query.fromDate;
  let toDates = req.query.toDate;

  const convertedDates = DateConvertTimeZone(fromDates, toDates);
  console.log(convertedDates);

  let fromDate = convertedDates.fromDate;
  let toDate = convertedDates.toDate;
  let vendorID = req.query.vendorID;
  try {
    let query = {};
    if (fromDate && toDate) query.createdAt = { $gte: fromDate, $lte: toDate };
    if (vendorID) query.vendorID = vendorID;
    let populateArr = ['name', 'color', 'make', 'body_type', 'location', 'model', 'vendorID'];

    const carsreport = await CarModel.find(query).populate(populateArr).sort({ createdAt: -1 });

    return res.status(200).send({ message: `Car Report Data`, carsreport });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error.message || 'Something went Wrong', error });
  }
};
exports.getTestDriveReport = async (req, res) => {
  let fromDates = req.query.fromDate;
  let toDates = req.query.toDate;

  const convertedDates = DateConvertTimeZone(fromDates, toDates);
  console.log(convertedDates);

  let fromDate = convertedDates.fromDate;
  let toDate = convertedDates.toDate;
  try {
    let query = {};
    if (fromDate && toDate) {
      query.createdAt = { $gte: fromDate, $lte: toDate };
    }
    const testDrives = await TestDriveModel.find(query)
      .populate(['name', 'vendor_id', 'customer_id'])
      .populate({
        path: 'car_id',
        populate: [
          { path: 'name', model: 'CarNameModel' },
          { path: 'make', model: 'Brand' },
          { path: 'model', model: 'CarModel' }
        ]
      })
      .populate({
        path: 'vendor_id',
        populate: [
          {
            path: 'reference',
            model: 'employees'
          }
        ]
      })
      .sort({ updated_at: 'desc' });
    return res.status(200).send({ message: `Test Drives Report Data`, testDrives });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error.message || 'Something went Wrong', error });
  }
};

exports.getVendorsReport = async (req, res) => {
  let fromDates = req.query.fromDate;
  let toDates = req.query.toDate;

  const convertedDates = DateConvertTimeZone(fromDates, toDates);
  console.log(convertedDates);

  let fromDate = convertedDates.fromDate;
  let toDate = convertedDates.toDate;
  try {
    let query = {};
    if (fromDate && toDate) {
      query.createdAt = { $gte: fromDate, $lte: toDate };
    }
    const vendors = await VendorModel.find(query).populate('reference').sort({ created_at: -1 });
    return res.status(200).send({ message: `Vendor Report Data`, vendors });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error.message || 'Something went Wrong', error });
  }
};

exports.getEmployeesReport = async (req, res) => {
  let fromDates = req.query.fromDate;
  let toDates = req.query.toDate;

  const convertedDates = DateConvertTimeZone(fromDates, toDates);
  console.log(convertedDates);

  let fromDate = convertedDates.fromDate;
  let toDate = convertedDates.toDate;
  try {
    let query = {};
    if (fromDate && toDate) {
      query.createdAt = { $gte: fromDate, $lte: toDate };
    }
    const employees = await EmployeeModel.find(query).sort({ created_at: -1 });
    return res.status(200).send({ message: `Employee Report Data`, employees });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error.message || 'Something went Wrong', error });
  }
};

exports.getCustomersReport = async (req, res) => {
  let fromDates = req.query.fromDate;
  let toDates = req.query.toDate;

  const convertedDates = DateConvertTimeZone(fromDates, toDates);
  console.log(convertedDates);

  let fromDate = convertedDates.fromDate;
  let toDate = convertedDates.toDate;
  try {
    let query = {};
    if (fromDate && toDate) {
      query.createdAt = { $gte: fromDate, $lte: toDate };
    }
    const customers = await CustomerModel.find(query).sort({ created_at: -1 });
    return res.status(200).send({ message: `Customer Report Data`, customers });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error.message || 'Something went Wrong', error });
  }
};
