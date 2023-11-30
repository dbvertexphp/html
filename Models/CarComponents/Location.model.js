const mongoose = require("mongoose");

const LocationSchema = mongoose.Schema({
    name: { type: String, required: true },
    short_name: { type: String },
    city: { type: String },
    state: { type: String },
    status: { type: String, enum: ["0", "1"], default: "1" },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    deleted_at: { type: Date, default: null },
});

const LocationModel = mongoose.model("location", LocationSchema);

module.exports = LocationModel;