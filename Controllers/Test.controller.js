const CarModel = require("../Models/Car.model");
const CustomerModel = require("../Models/Customer.model");
const VendorModel = require("../Models/Vendor.model");
const BookingModel = require("../Models/Booking.model");
const TestDriveModel = require("../Models/TestDrive.model");
const UserModel = require("../Models/User.model");
const EmployeeModel = require("../Models/EmployeeModel");
const TransactionModel = require("../Models/Transaction.model");

exports.getDashboardData = async (req, res) => {
    try {
        const Cars = await CarModel.find().count()
        const Vendors = await VendorModel.find().count()
        const Employees = await EmployeeModel.find().count()
        const Users = await UserModel.find().count()
        const Bookings = await BookingModel.find().count()
        const Customers = await CustomerModel.find().count()
        const Tdrives = await TestDriveModel.find().count()
        const Transactions = await TransactionModel.find().count()
        return res.status(200).send({ message: "Dashboard", Cars, Vendors, Customers, Bookings, Tdrives, Employees, Users, Transactions });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: error?.message || "Something went Wrong", error });
    }
};
exports.getVendorDashboardDataByID = async (req, res) => {
    let id = req.params.id
    try {
        const Bookings = await BookingModel.find({ vendor_id: id }).count()
        const Tdrives = await TestDriveModel.find({ vendor_id: id }).count()
        const AllTransaction = await TransactionModel.find().populate("car_id")
        let temp = []
        for (const trans of AllTransaction) {
            if (trans?.car_id?.vendorID == id) {
                temp.push(trans)
            }
        }
        return res.status(200).send({ message: "Vendor Dashboard", Bookings, Tdrives, Transactions: temp.length });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: error?.message || "Something went Wrong", error });
    }
};
exports.getSales = async (req, res) => {
    try {
        const Transactions = await TransactionModel.find({ status: "PAYMENT_SUCCESS" })
        let daily = 0
        let monthly = 0
        let total = 0
        for (const trxn of Transactions) {
            let x = trxn.amount_to_pay
            const date = new Date(trxn.createdAt);
            let currdate = new Date()
            let trxnday = date.getUTCDate();
            let trxnmonth = date.getUTCMonth() + 1;
            let trxnyear = date.getUTCFullYear();
            let currday = currdate.getDate()
            let currmonth = currdate.getMonth() + 1
            let curryear = currdate.getFullYear()
            if (trxnday == currday && trxnmonth == currmonth && trxnyear == curryear) daily += x
            if (trxnmonth == currmonth && trxnyear == curryear) monthly += x
            total += x
        }
        return res.status(200).send({ message: "Transaction data", daily, monthly, total });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: error?.message || "Something went Wrong", error });
    }
};