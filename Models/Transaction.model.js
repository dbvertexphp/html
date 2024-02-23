const mongoose = require('mongoose');

const TransactionSchema = mongoose.Schema(
  {
    customer_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Customer'
    },
    test_drive_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'TestDrive'
    },
    car_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Car'
    },
    reference_id: { type: String },
    status: {
      type: String,
      default: 'PAYMENT_PENDING'
    },
    customer_name: { type: String },
    vendor_pay_amount: { type: Number },
    transaction_type: { type: String },
    amount_to_pay: { type: Number },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    deleted_at: { type: Date, default: null }
  },
  { timestamps: true }
);

const TransactionModel = mongoose.model('Transaction', TransactionSchema);

module.exports = TransactionModel;
