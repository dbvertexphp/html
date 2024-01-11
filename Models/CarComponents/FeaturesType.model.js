const mongoose = require('mongoose');

const FeaturesSchema = mongoose.Schema({
  name: { type: String, required: true },
  label: { type: String },
  status: { type: String, enum: ['0', '1'], default: '1' },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  deleted_at: { type: Date, default: null }
});

const FeaturesModel = mongoose.model('Features', FeaturesSchema);

module.exports = FeaturesModel;
