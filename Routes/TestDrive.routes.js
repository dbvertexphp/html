const { Router } = require("express");
const {
  getAllTestDrives,
  getTestDriveByID,
  addTestDrive,
  updateTestDriveByID,
  deleteTestDriveByID,
  getTestDriveByOfUser,
  getAllTestDrivesOnlyCarID,
  getTestDriveByOfCar,
  getAllTestDrivesByVendorID,
} = require("../Controllers/TestDrive.controller");
const Authentication = require("../Middlewares/Authentication.middleware");
const Authorization = require("../Middlewares/Authorization.middleware");

const TestDriveRouter = Router();

TestDriveRouter.get("/", (req, res) => res.status(200).send("Welcome to Test Drive Route"));
TestDriveRouter.get("/get-all-testdrives", getAllTestDrives);
TestDriveRouter.get("/get-all-testdrives-of-car-ids", getAllTestDrivesOnlyCarID);
TestDriveRouter.get("/get-all-testdrives-of-customer/:id", getTestDriveByOfUser);
TestDriveRouter.get("/get-all-testdrives-of-vendorid/:id", Authentication, getAllTestDrivesByVendorID);
TestDriveRouter.get("/get-all-testdrives-of-car/:id", getTestDriveByOfCar);
TestDriveRouter.get("/get-testdrive/:id", getTestDriveByID);

TestDriveRouter.post("/add", addTestDrive);

TestDriveRouter.patch("/update/:id", Authentication, updateTestDriveByID);
TestDriveRouter.patch("/delete/:id", Authentication, deleteTestDriveByID);

module.exports = TestDriveRouter;
