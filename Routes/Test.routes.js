const UploadFunction = require("../Config/AWS-Upload");
const { getDashboardData, getSales, getVendorDashboardDataByID,getEmployeeDashboardDataByID,getAllVendorsByEmployee ,getAllCarsByEmployeeID} = require("../Controllers/Test.controller");
const Authentication = require("../Middlewares/Authentication.middleware");
const Authorization = require("../Middlewares/Authorization.middleware");
const TestRouter = require("express").Router();

TestRouter.get("/", (req, res) => res.status(200).send({ message: "Welcome to Test Route" }));
TestRouter.get("/get-dashboard-data", Authentication, Authorization(["Admin"]), getDashboardData);
TestRouter.get("/get-vendor-dashboard-data/:id", Authentication, getVendorDashboardDataByID);
TestRouter.get("/get-employee-dashboard-data/:id", Authentication, getEmployeeDashboardDataByID);
TestRouter.get("/get-all-employee-vendor/:id", Authentication, getAllVendorsByEmployee);
TestRouter.get("/get-all-cars-employee/:id", getAllCarsByEmployeeID);
TestRouter.get("/get-sales-data", Authentication, Authorization(["Admin"]), getSales);

TestRouter.post("/upload-to-s3", UploadFunction.single("file"), (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    const fileUrl = req.file.location;
    res.status(200).json({ message: 'File uploaded successfully', fileUrl });
});


module.exports = TestRouter;