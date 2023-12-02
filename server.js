const Connection = require("./Config/db");
const UserRouter = require("./Routes/User.routes");
const VendorRouter = require("./Routes/Vendor.routes");
const CustomerRouter = require("./Routes/Customer.routes");

const {
  CarModelRouter,
  BodyTypeRouter,
  MakeRouter,
  ColorRouter,
  LocationRouter,
  CarNameRouter,
} = require("./Routes/CarComponents.routes");
const CarRouter = require("./Routes/Car.routes");
const TestRouter = require("./Routes/Test.routes");
const WebsiteRouter = require("./Routes/Website.routes");
const EmployeeRouter = require("./Routes/Employee.routes");
const TestDriveRouter = require("./Routes/TestDrive.routes");
const PhonepeRouter = require("./Routes/PhonePay.routes");

const bodyParser = require("body-parser");

const express = require("express");
const cors = require("cors");
const path = require("path");
const BookingRouter = require("./Routes/Booking.routes");
const TransactionRouter = require("./Routes/Transaction.routes");
const { contactUs } = require("./Controllers/contact.controller");
const ReportRouter = require("./Routes/Report.routes");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, "Frontend", "dist")));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/test", TestRouter);
app.use("/api/website", WebsiteRouter);
app.use("/api/user", UserRouter);
app.use("/api/customer", CustomerRouter);
app.use("/api/employee", EmployeeRouter);
app.use("/api/vendor", VendorRouter);
app.use("/api/vendor/car", CarRouter);
app.use("/api/admin/carmodel", CarModelRouter);
app.use("/api/admin/bodytype", BodyTypeRouter);
app.use("/api/admin/make", MakeRouter);
app.use("/api/admin/color", ColorRouter);
app.use("/api/admin/location", LocationRouter);
app.use("/api/admin/carname", CarNameRouter);
app.use("/api/booking", BookingRouter);
app.use("/api/test-drive", TestDriveRouter);
app.use("/api/phonepe", PhonepeRouter);
app.use("/api/transaction", TransactionRouter);
app.use("/api/report", ReportRouter);

app.use("/api/contact-us", contactUs);
// app.use("/api/instamojo", PaymentRouter)

app.get("/", (req, res) => {
  try {
    res.status(200).json({ Message: "Welcome to Vendor App" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ Error: err });
  }
});
//? HTML Request
app.get("/*", (req, res) => {
  console.log(`Inside /* - URL : ${req.url}`);
  res.setHeader("Content-Type", "text/html");
  res.status(200).sendFile(__dirname + "/Frontend/dist/index.html");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  try {
    await Connection;
    console.log("Connected to DB");
  } catch (error) {
    console.log(error);
    console.log("Error connecting to DB");
  }
  console.log(`Server is Rocking on port ${PORT}`);
});
