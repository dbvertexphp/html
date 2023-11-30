const BookingModel = require("../Models/Booking.model");
const CustomerModel = require("../Models/Customer.model");
const EmployeeModel = require("../Models/EmployeeModel");
const VendorModel = require("../Models/Vendor.model");

exports.getUniqueCustomerCode = async () => {
  let Customers = await CustomerModel.find().select({ customer_code: 1 });

  let CN = null;

  let lastNum = 1;
  Customers.forEach((el) => {
    let x = el?.customer_code?.split("/")[2];

    if (+lastNum <= x) lastNum = +x + 1;
  });
  const year = new Date().getFullYear();
  CN = `EGC-C/${String(year).slice(2)}-${String(year + 1).slice(2)}/${lastNum}`;

  return CN;
};
exports.getUniqueBookingCode = async () => {
  let Bookings = await BookingModel.find().select({ booking_code: 1 });

  let CN = null;

  let lastNum = 1;
  Bookings.forEach((el) => {
    let x = el?.booking_code?.split("/")[2];

    if (+lastNum <= x) lastNum = +x + 1;
  });
  CN = `EGC-BK/${getCurrentDate()}/${lastNum}`;
  return CN;
};

exports.getUniqueVendorCode = async () => {
  let vendors = await VendorModel.find().select({ vendor_code: 1 });

  let VN = null;

  let lastNum = 1;
  vendors.forEach((el) => {
    let x = el?.vendor_code?.split("/")[2];

    if (+lastNum <= x) lastNum = +x + 1;
  });
  const year = new Date().getFullYear();
  VN = `EGC-V/${String(year).slice(2)}-${String(year + 1).slice(2)}/${lastNum}`;

  return VN;
};


exports.getUniqueEmployeeCode = async () => {
  let employees = await EmployeeModel.find().select({ employee_code: 1 });

  let VN = null;

  let lastNum = 1;
  employees.forEach((el) => {
    let x = el?.employee_code?.split("/")[2];

    if (+lastNum <= x) lastNum = +x + 1;
  });
  const year = new Date().getFullYear();
  VN = `EGC-E/${String(year).slice(2)}-${String(year + 1).slice(2)}/${lastNum}`;

  return VN;
};

function getCurrentDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
