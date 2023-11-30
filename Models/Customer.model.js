const mongoose = require("mongoose");

const CustomerSchema = mongoose.Schema(
  {
    customer_code: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, default: "Customer" },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    profile_pic: { type: String },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pin: { type: String, required: true },
    phone_number: { type: Number },
    status: {
      type: String,
      enum: ["active", "disabled"],
      default: "active",
    },
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const CustomerModel = mongoose.model("Customer", CustomerSchema);

module.exports = CustomerModel;
