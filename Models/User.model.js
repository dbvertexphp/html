const mongoose = require('mongoose');

const UserSchema = mongoose.Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    first_name: { type: String, require: true },
    last_name: { type: String, require: true },
    phone_number: { type: Number, require: true },
    gender: { type: String },
    role: { type: String, enum: ['User', 'Admin'], default: 'Admin' },
    address: { type: String },
    state: { type: String },
    city: { type: String },
    pincode: { type: Number },
    profile_photo: { type: String },
    aadhar_number: { type: Number },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    deleted_at: { type: Date, default: null }
  },
  { timestamps: true }
);

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
