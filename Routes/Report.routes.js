const { getTransactionReport, getBookingReport, getTestDriveReport, getCustomersReport, getEmployeesReport, getVendorsReport, getCarReport } = require("../Controllers/Report.controller");
const Authentication = require("../Middlewares/Authentication.middleware");
const Authorization = require("../Middlewares/Authorization.middleware");

const ReportRouter = require("express").Router();

ReportRouter.get("/", (req, res) => res.status(200).send({ message: "Welcome to report Route" }));

ReportRouter.get("/get-transaction-report", Authentication, Authorization(["Admin"]), getTransactionReport);
ReportRouter.get("/get-testdrive-report", Authentication, Authorization(["Admin"]), getTestDriveReport);
ReportRouter.get("/get-booking-report", Authentication, Authorization(["Admin"]), getBookingReport);

ReportRouter.get("/get-customer-report", Authentication, Authorization(["Admin"]), getCustomersReport);
ReportRouter.get("/get-employee-report", Authentication, Authorization(["Admin"]), getEmployeesReport);
ReportRouter.get("/get-vendor-report", Authentication, Authorization(["Admin"]), getVendorsReport);
ReportRouter.get("/get-car-report", Authentication, Authorization(["Admin"]), getCarReport);



module.exports = ReportRouter;