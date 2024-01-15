const UploadFunction = require("../Config/AWS-Upload");
const { addWishlist, removeWishlist ,getDashboardData, getSales, getVendorDashboardDataByID,getEmployeeDashboardDataByID,getAllTestdriveByEmployeeID,getAllBookingByEmployeeID ,getAllCarsByEmployeeID,getCarByID,getAllVendorsByEmployee} = require("../Controllers/Test.controller");
const Authentication = require("../Middlewares/Authentication.middleware");
const Authorization = require("../Middlewares/Authorization.middleware");
const TestRouter = require("express").Router();

TestRouter.get("/", (req, res) => res.status(200).send({ message: "Welcome to Test Route" }));
TestRouter.get("/get-dashboard-data", Authentication, Authorization(["Admin"]), getDashboardData);
TestRouter.get("/get-vendor-dashboard-data/:id", Authentication, getVendorDashboardDataByID);
TestRouter.get("/get-employee-dashboard-data/:id", Authentication, getEmployeeDashboardDataByID);
TestRouter.get("/get-all-cars-employee/:id", getAllCarsByEmployeeID);
TestRouter.get("/get-all-booking-employee/:id", getAllBookingByEmployeeID);
TestRouter.get("/get-all-testdrive-employee/:id", getAllTestdriveByEmployeeID);
TestRouter.get("/get-all-employee-vendor/:id", getAllVendorsByEmployee);

TestRouter.get("/get-sales-data", Authentication, Authorization(["Admin"]), getSales);
TestRouter.get("/get-car/:id", getCarByID);
TestRouter.post("/upload-to-s3", UploadFunction.single("file"), (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    const fileUrl = req.file.location;
    res.status(200).json({ message: 'File uploaded successfully', fileUrl });
});

TestRouter.post("/savewishlist", addWishlist);
TestRouter.delete("/removeinwishlist/:userId/:carId", removeWishlist);

module.exports = TestRouter;
