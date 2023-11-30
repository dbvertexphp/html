const { addBooking, getAllBookings, UpdateBookingByID, getBookingsByUserID, getBookingsByCarID, getBookingsByVendorID } = require("../Controllers/Booking.controller");
const Authentication = require("../Middlewares/Authentication.middleware");

const BookingRouter = require("express").Router();

BookingRouter.get("/", (req, res) => res.status(200).send({ message: "Welcome to Car Route" }));
BookingRouter.get("/get-all-bookings", getAllBookings);
BookingRouter.get("/get-bookings-by-userid/:id", getBookingsByUserID);
BookingRouter.get("/get-bookings-by-vendorid/:id", getBookingsByVendorID);
BookingRouter.get("/get-bookings-by-carid/:id", getBookingsByCarID);

BookingRouter.post("/book-a-car", Authentication, addBooking);

BookingRouter.patch("/update/:id", Authentication, UpdateBookingByID);


module.exports = BookingRouter;