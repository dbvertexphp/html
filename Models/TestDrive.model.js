const mongoose = require("mongoose");

const testDriveSchema = new mongoose.Schema(
  {
    car_id: { type: mongoose.Schema.Types.ObjectId, ref: "Car" },
    vendor_id: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor" },
    customer_id: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
    name: { type: String },
    email: { type: String },
    phone_number: { type: String },
    address: { type: String },
    state: { type: String },
    city: { type: String },
    pincode: { type: String },
    prefered_date: { type: String },
    test_drive_date: { type: String },
    test_drive_slot: { type: String },
    driving_license: { type: String },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    isDrived: {
      type: String,
      enum: ["0", "1"],
      default: "0",
    },
    payment_status: { type: String },
  },
  {
    timestamps: true,
  }
);

const TestDriveModel = mongoose.model("TestDrive", testDriveSchema);

module.exports = TestDriveModel;

