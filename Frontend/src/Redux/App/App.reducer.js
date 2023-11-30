import * as userTypes from "../App/Types/User.type";
import * as vendorTypes from "../App/Types/Vendor.type";
import * as OrderTypes from "../App/Types/Order.type";
import * as WebsiteTypes from "../App/Types/Website.types";
import * as customerTypes from "../App/Types/Customer.type";
import * as employeeTypes from "../App/Types/Employee.type";
import * as testDriveTypes from "../App/Types/TestDrive.type";
import * as bookingTypes from "../App/Types/Booking.type";
import * as transactionTypes from "../App/Types/Transaction.type";
import * as reportTypes from "../App/Types/Admin/Report.type";

const initState = {
  customers: [],
  CustomerByID: {},
  totalCustomers: 0,

  bookings: [],
  BookingByID: {},
  totalBookings: 0,

  transactions: [],
  TransactionByID: {},
  totalTransactions: 0,

  vendors: [],
  VendorByID: {},
  totalVendors: 0,

  employees: [],
  EmployeeByID: {},
  totalEmployees: 0,

  testDrives: [],
  testDriveByID: {},
  totalTestDrives: 0,

  users: [],
  orders: [],
  loading: false,
  error: false,
};

//? Vendor-------------
export const vendorReducer = (state = initState, { type, payload }) => {
  switch (type) {
    //? get vendor
    case vendorTypes.VENDOR_GET_LOADING: {
      return { ...state, loading: true, error: false };
    }
    case vendorTypes.VENDOR_GET_ERROR: {
      return { ...state, loading: false, error: true };
    }
    case vendorTypes.VENDOR_GET_SUCCESS: {
      return { ...state, loading: false, error: false, vendors: payload?.Vendors, totalVendors: payload?.totalVendors };
    }

    case vendorTypes.VENDOR_GET_BY_ID_LOADING: {
      return { ...state, loading: true, error: false };
    }
    case vendorTypes.VENDOR_GET_BY_ID_ERROR: {
      return { ...state, loading: false, error: true };
    }
    case vendorTypes.VENDOR_GET_BY_ID_SUCCESS: {
      return { ...state, loading: false, error: false, VendorByID: payload };
    }
    //? Post vendor
    case vendorTypes.VENDOR_POST_LOADING: {
      return { ...state, loading: true, error: false };
    }
    case vendorTypes.VENDOR_POST_ERROR: {
      return { ...state, loading: false, error: true };
    }
    case vendorTypes.VENDOR_POST_SUCCESS: {
      return { ...state, loading: false, error: false };
    }
    //? Updte vendor
    case vendorTypes.VENDOR_UPDATE_LOADING: {
      return { ...state, loading: true, error: false };
    }
    case vendorTypes.VENDOR_UPDATE_ERROR: {
      return { ...state, loading: false, error: true };
    }
    case vendorTypes.VENDOR_UPDATE_SUCCESS: {
      return { ...state, loading: false, error: false };
    }
    //? Delete vendor
    case vendorTypes.VENDOR_DELETE_LOADING: {
      return { ...state, loading: true, error: false };
    }
    case vendorTypes.VENDOR_DELETE_ERROR: {
      return { ...state, loading: false, error: true };
    }
    case vendorTypes.VENDOR_DELETE_SUCCESS: {
      return { ...state, loading: false, error: false };
    }

    default: {
      return state;
    }
  }
};
//? Customer-------------
export const CustomerReducer = (state = initState, { type, payload }) => {
  switch (type) {
    //? get customer
    case customerTypes.CUSTOMER_GET_LOADING: {
      return { ...state, loading: true, error: false };
    }
    case customerTypes.CUSTOMER_GET_ERROR: {
      return { ...state, loading: false, error: true };
    }
    case customerTypes.CUSTOMER_GET_SUCCESS: {
      return { ...state, loading: false, error: false, customers: payload?.customers, totalCustomers: payload?.totalCustomers };
    }

    case customerTypes.CUSTOMER_GET_BY_ID_LOADING: {
      return { ...state, loading: true, error: false };
    }
    case customerTypes.CUSTOMER_GET_BY_ID_ERROR: {
      return { ...state, loading: false, error: true };
    }
    case customerTypes.CUSTOMER_GET_BY_ID_SUCCESS: {
      return { ...state, loading: false, error: false, CustomerByID: payload };
    }
    //? Post customer
    case customerTypes.CUSTOMER_POST_LOADING: {
      return { ...state, loading: true, error: false };
    }
    case customerTypes.CUSTOMER_POST_ERROR: {
      return { ...state, loading: false, error: true };
    }
    case customerTypes.CUSTOMER_POST_SUCCESS: {
      return { ...state, loading: false, error: false };
    }
    //? Updte customer
    case customerTypes.CUSTOMER_UPDATE_LOADING: {
      return { ...state, loading: true, error: false };
    }
    case customerTypes.CUSTOMER_UPDATE_ERROR: {
      return { ...state, loading: false, error: true };
    }
    case customerTypes.CUSTOMER_UPDATE_SUCCESS: {
      return { ...state, loading: false, error: false };
    }
    //? Delete customer
    case customerTypes.CUSTOMER_DELETE_LOADING: {
      return { ...state, loading: true, error: false };
    }
    case customerTypes.CUSTOMER_DELETE_ERROR: {
      return { ...state, loading: false, error: true };
    }
    case customerTypes.CUSTOMER_DELETE_SUCCESS: {
      return { ...state, loading: false, error: false };
    }

    default: {
      return state;
    }
  }
};

//? User-------------
export const userReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case userTypes.USER_GET_LOADING: {
      return { ...state, loading: true, error: false };
    }
    case userTypes.USER_GET_ERROR: {
      return { ...state, loading: false, error: true };
    }
    case userTypes.USER_GET_SUCCESS: {
      return { ...state, loading: false, error: false, users: payload };
    }

    case userTypes.USER_POST_LOADING: {
      return { ...state, loading: true, error: false };
    }
    case userTypes.USER_POST_ERROR: {
      return { ...state, loading: false, error: true };
    }
    case userTypes.USER_POST_SUCCESS: {
      return { ...state, loading: false, error: false };
    }

    default: {
      return state;
    }
  }
};

//? Orders-------------
export const orderReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case OrderTypes.ORDER_GET_LOADING: {
      return { ...state, loading: true, error: false };
    }
    case OrderTypes.ORDER_GET_ERROR: {
      return { ...state, loading: false, error: true };
    }
    case OrderTypes.ORDER_GET_SUCCESS: {
      return { ...state, loading: false, error: false, orders: payload };
    }

    case OrderTypes.ORDER_POST_LOADING: {
      return { ...state, loading: true, error: false };
    }
    case OrderTypes.ORDER_POST_ERROR: {
      return { ...state, loading: false, error: true };
    }
    case OrderTypes.ORDER_POST_SUCCESS: {
      return { ...state, loading: false, error: false };
    }

    default: {
      return state;
    }
  }
};

//? Website-------------
export const WebsiteReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case WebsiteTypes.WEBSITE_GET_LOADING: {
      return { ...state, loading: true, error: false };
    }
    case WebsiteTypes.WEBSITE_GET_ERROR: {
      return { ...state, loading: false, error: true };
    }
    case WebsiteTypes.WEBSITE_GET_SUCCESS: {
      return { ...state, loading: false, error: false, WebData: payload };
    }

    case WebsiteTypes.WEBSITE_POST_LOADING: {
      return { ...state, loading: true, error: false };
    }
    case WebsiteTypes.WEBSITE_POST_ERROR: {
      return { ...state, loading: false, error: true };
    }
    case WebsiteTypes.WEBSITE_POST_SUCCESS: {
      return { ...state, loading: false, error: false };
    }

    case WebsiteTypes.WEBSITE_SEND_LOADING: {
      return { ...state, loading: true, error: false };
    }
    case WebsiteTypes.WEBSITE_SEND_ERROR: {
      return { ...state, loading: false, error: true };
    }
    case WebsiteTypes.WEBSITE_SEND_SUCCESS: {
      return { ...state, loading: false, error: false };
    }
    default: {
      return state;
    }
  }
};

// Booking Reducer

export const BookingReducer = (state = initState, { type, payload }) => {
  switch (type) {
    //? get Bookings
    case bookingTypes.BOOKING_GET_LOADING: {
      return { ...state, loading: true, error: false };
    }
    case bookingTypes.BOOKING_GET_ERROR: {
      return { ...state, loading: false, error: true };
    }
    case bookingTypes.BOOKING_GET_SUCCESS: {
      return { ...state, loading: false, error: false, bookings: payload?.bookings, totalBookings: payload?.totalEmployees };
    }

    case bookingTypes.BOOKING_GET_BY_ID_LOADING: {
      return { ...state, loading: true, error: false };
    }
    case bookingTypes.BOOKING_GET_BY_ID_ERROR: {
      return { ...state, loading: false, error: true };
    }
    case bookingTypes.BOOKING_GET_BY_ID_SUCCESS: {
      return { ...state, loading: false, error: false, BookingByID: payload };
    }
    //? Post Bookings
    case bookingTypes.BOOKING_POST_LOADING: {
      return { ...state, loading: true, error: false };
    }
    case bookingTypes.BOOKING_POST_ERROR: {
      return { ...state, loading: false, error: true };
    }
    case bookingTypes.BOOKING_POST_SUCCESS: {
      return { ...state, loading: false, error: false };
    }
    //? Updte Bookings
    case bookingTypes.BOOKING_UPDATE_LOADING: {
      return { ...state, loading: true, error: false };
    }
    case bookingTypes.BOOKING_UPDATE_ERROR: {
      return { ...state, loading: false, error: true };
    }
    case bookingTypes.BOOKING_UPDATE_SUCCESS: {
      return { ...state, loading: false, error: false };
    }
    //? Delete Bookings
    // case bookingTypes.BOOKING_DELETE_LOADING: {
    //   return { ...state, loading: true, error: false };
    // }
    // case bookingTypes.BOOKING_DELETE_ERROR: {
    //   return { ...state, loading: false, error: true };
    // }
    // case bookingTypes.BOOKING_DELETE_SUCCESS: {
    //   return { ...state, loading: false, error: false };
    // }

    default: {
      return state;
    }
  }
};
// Transaction Reducer

export const TransactionReducer = (state = initState, { type, payload }) => {
  switch (type) {
    //? get Transactions
    case transactionTypes.TRANSACTION_GET_LOADING: {
      return { ...state, loading: true, error: false };
    }
    case transactionTypes.TRANSACTION_GET_ERROR: {
      return { ...state, loading: false, error: true };
    }
    case transactionTypes.TRANSACTION_GET_SUCCESS: {
      return { ...state, loading: false, error: false, transactions: payload?.transactions, totalTransactions: payload?.totaltransactions };
    }

    case transactionTypes.TRANSACTION_GET_BY_ID_LOADING: {
      return { ...state, loading: true, error: false };
    }
    case transactionTypes.TRANSACTION_GET_BY_ID_ERROR: {
      return { ...state, loading: false, error: true };
    }
    case transactionTypes.TRANSACTION_GET_BY_ID_SUCCESS: {
      return { ...state, loading: false, error: false, TransactionByID: payload };
    }
    //? Post Transactions
    case transactionTypes.TRANSACTION_POST_LOADING: {
      return { ...state, loading: true, error: false };
    }
    case transactionTypes.TRANSACTION_POST_ERROR: {
      return { ...state, loading: false, error: true };
    }
    case transactionTypes.TRANSACTION_POST_SUCCESS: {
      return { ...state, loading: false, error: false };
    }
    //? Updte Transactions
    case transactionTypes.TRANSACTION_UPDATE_LOADING: {
      return { ...state, loading: true, error: false };
    }
    case transactionTypes.TRANSACTION_UPDATE_ERROR: {
      return { ...state, loading: false, error: true };
    }
    case transactionTypes.TRANSACTION_UPDATE_SUCCESS: {
      return { ...state, loading: false, error: false };
    }
    // //? Delete Transactions
    // case transactionTypes.TRANSACTION_DELETE_LOADING: {
    //   return { ...state, loading: true, error: false };
    // }
    // case transactionTypes.TRANSACTION_DELETE_ERROR: {
    //   return { ...state, loading: false, error: true };
    // }
    // case transactionTypes.TRANSACTION_DELETE_SUCCESS: {
    //   return { ...state, loading: false, error: false };
    // }

    default: {
      return state;
    }
  }
};
// Employee Reducer

export const EmployeeReducer = (state = initState, { type, payload }) => {
  switch (type) {
    //? get vendor
    case employeeTypes.EMPLOYEE_GET_LOADING: {
      return { ...state, loading: true, error: false };
    }
    case employeeTypes.EMPLOYEE_GET_ERROR: {
      return { ...state, loading: false, error: true };
    }
    case employeeTypes.EMPLOYEE_GET_SUCCESS: {
      return { ...state, loading: false, error: false, employees: payload?.employees, totalEmployees: payload?.totalEmployees };
    }

    case employeeTypes.EMPLOYEE_GET_BY_ID_LOADING: {
      return { ...state, loading: true, error: false };
    }
    case employeeTypes.EMPLOYEE_GET_BY_ID_ERROR: {
      return { ...state, loading: false, error: true };
    }
    case employeeTypes.EMPLOYEE_GET_BY_ID_SUCCESS: {
      return { ...state, loading: false, error: false, EmployeeByID: payload };
    }
    //? Post vendor
    case employeeTypes.EMPLOYEE_POST_LOADING: {
      return { ...state, loading: true, error: false };
    }
    case employeeTypes.EMPLOYEE_POST_ERROR: {
      return { ...state, loading: false, error: true };
    }
    case employeeTypes.EMPLOYEE_POST_SUCCESS: {
      return { ...state, loading: false, error: false };
    }
    //? Updte EMPLOYEE
    case employeeTypes.EMPLOYEE_UPDATE_LOADING: {
      return { ...state, loading: true, error: false };
    }
    case employeeTypes.EMPLOYEE_UPDATE_ERROR: {
      return { ...state, loading: false, error: true };
    }
    case employeeTypes.EMPLOYEE_UPDATE_SUCCESS: {
      return { ...state, loading: false, error: false };
    }
    //? Delete EMPLOYEE
    case employeeTypes.EMPLOYEE_DELETE_LOADING: {
      return { ...state, loading: true, error: false };
    }
    case employeeTypes.EMPLOYEE_DELETE_ERROR: {
      return { ...state, loading: false, error: true };
    }
    case employeeTypes.EMPLOYEE_DELETE_SUCCESS: {
      return { ...state, loading: false, error: false };
    }

    default: {
      return state;
    }
  }
};

export const TestDriveReducer = (state = initState, { type, payload }) => {
  switch (type) {
    //? get vendor
    case testDriveTypes.TESTDRIVE_GET_LOADING: {
      return { ...state, loading: true, error: false };
    }
    case testDriveTypes.TESTDRIVE_GET_ERROR: {
      return { ...state, loading: false, error: true };
    }
    case testDriveTypes.TESTDRIVE_GET_SUCCESS: {
      return { ...state, loading: false, error: false, testDrives: payload?.TestDrives, totalTestDrives: payload?.totalTestDrives };
    }

    case testDriveTypes.TESTDRIVE_GET_BY_ID_LOADING: {
      return { ...state, loading: true, error: false };
    }
    case testDriveTypes.TESTDRIVE_GET_BY_ID_ERROR: {
      return { ...state, loading: false, error: true };
    }
    case testDriveTypes.TESTDRIVE_GET_BY_ID_SUCCESS: {
      return { ...state, loading: false, error: false, testDriveByID: payload };
    }
    //? Post vendor
    case testDriveTypes.TESTDRIVE_POST_LOADING: {
      return { ...state, loading: true, error: false };
    }
    case testDriveTypes.TESTDRIVE_POST_ERROR: {
      return { ...state, loading: false, error: true };
    }
    case testDriveTypes.TESTDRIVE_POST_SUCCESS: {
      return { ...state, loading: false, error: false };
    }
    //? Updte TESTDRIVE
    case testDriveTypes.TESTDRIVE_UPDATE_LOADING: {
      return { ...state, loading: true, error: false };
    }
    case testDriveTypes.TESTDRIVE_UPDATE_ERROR: {
      return { ...state, loading: false, error: true };
    }
    case testDriveTypes.TESTDRIVE_UPDATE_SUCCESS: {
      return { ...state, loading: false, error: false };
    }
    // //? Delete EMPLOYEE
    // case testDriveTypes.EMPLOYEE_DELETE_LOADING: {
    //   return { ...state, loading: true, error: false };
    // }
    // case testDriveTypes.EMPLOYEE_DELETE_ERROR: {
    //   return { ...state, loading: false, error: true };
    // }
    // case testDriveTypes.EMPLOYEE_DELETE_SUCCESS: {
    //   return { ...state, loading: false, error: false };
    // }

    default: {
      return state;
    }
  }
};


export const ReportReducer = (state = initState, { type, payload }) => {
  switch (type) {
    // get reports
    case reportTypes.REPORT_GET_LOADING: {
      return { ...state, loading: true, error: false };
    }
    case reportTypes.REPORT_GET_ERROR: {
      return { ...state, loading: false, error: true };
    }
    case reportTypes.REPORT_GET_SUCCESS: {
      return { ...state, loading: false, error: false };
    }

    default: {
      return state;
    }
  }
};

