const mongoose = require('mongoose');

const VendorSchema = mongoose.Schema(
  {
    vendor_code: { type: String, required: true },
    vendor_name: { type: String, require: true },
    status: { type: String, enum: ['active', 'pending', 'disabled'], default: 'pending' },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    company_name: { type: String, required: true },
    type: { type: String },
    role: { type: String, default: 'Vendor' },
    gst_number: { type: String },
    gst_doc: { type: String },
    pan_number: { type: String },
    commission_type: { type: String },
    commission_amount: { type: Number },
    pan_doc: { type: String },
    mobile_number: { type: String },
    phone_number: { type: String },
    profile_photo: { type: String },
    msme_number: { type: String },
    msme_doc: { type: String },
    address: {
      address1: { type: String },
      address2: { type: String },
      state: { type: String },
      landmark: { type: String },
      district: { type: String },
      city: { type: String },
      pincode: { type: Number }
    },
    createdBy_admin: { type: Boolean, default: false },
    reference: { type: mongoose.Schema.Types.ObjectId, ref: 'employees' },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    deleted_at: { type: Date, default: null }
  },
  { timestamps: true }
);

const VendorModel = mongoose.model('Vendor', VendorSchema);

module.exports = VendorModel;
