const mongoose = require('mongoose');

const CustomerSchema = mongoose.Schema(
  {
    customer_code: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, default: 'Customer' },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    profile_pic: { type: String },
    address: { type: String },
    city: { type: String },
    state: { type: String },
    pin: { type: String },
    phone_number: { type: Number },
    status: {
      type: String,
      enum: ['active', 'disabled'],
      default: 'active'
    },
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
    password: { type: String, required: true },
    otp: { type: String },
    otp_verified: { type: Boolean, default: false }
  },
  { timestamps: true }
);

const CustomerModel = mongoose.model('Customer', CustomerSchema);

module.exports = CustomerModel;
