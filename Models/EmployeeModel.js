const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  employee_code: { type: String, required: true },
  email: { type: String, required: true },
  employee_name: { type: String, require: true },
  gender: { type: String, enum: ["male", "female", "others"], default: "male" },
  phone_number: { type: Number, require: true },
  status: {
    type: String,
    enum: ["active", "disabled"],
    default: "active",
  },
  profile_pic: { type: String },
  address: {
    address1: { type: String },
    address2: { type: String },
    city: { type: String },
    state: { type: String },
    pincode: { type: Number },
    landmark: { type: String },
    district: { type: String },
  },
  aadhar_number: { type: String },
  profile_photo: { type: String },
  aadhar_doc: { type: String },
  pan_number: { type: String },
  pan_doc: { type: String },
  references: [{
    name: { type: String },
    email: { type: String },
    phone_number: { type: Number },
  }]
}, { timestamps: true });

const EmployeeModel = mongoose.model("employees", employeeSchema);

module.exports = EmployeeModel;
