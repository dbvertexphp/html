const mongoose = require("mongoose");

const BookingModelSchema = mongoose.Schema({
    vendor_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Vendor",
    },
    customer_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Customer",
    },
    test_drive_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TestDrive",
    },
    car_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Car",
    },
    advanced_amount: { type: Number },
    total_amount: { type: Number },
    test_drive_booking_amount: { type: Number },
    customer_name: { type: String },
    remaining_amount: { type: Number },
    status: {
        type: String,
        enum: [
            "pending",
            "partially_paid",
            "paid",
        ],
        default: "pending",
    },
    type: {
        type: String,
        enum: [
            "booking",
            "testdrive",
        ],
        default: "testdrive",
    },
    booking_code: { type: String },
    payment_status: { type: String, enum: ["pending", "partially_paid", "paid"], default: "pending" },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    deleted_at: { type: Date, default: null },
}, { timestamps: true });


const BookingModel = mongoose.model("Booking", BookingModelSchema);

module.exports = BookingModel;