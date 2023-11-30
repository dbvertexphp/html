const mongoose = require("mongoose");

const BrandSchema = mongoose.Schema({
    name: { type: String, required: true },
    status: { type: String, enum: ["0", "1"], default: "1" },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    deleted_at: { type: Date, default: null },
});

const BrandModel = mongoose.model("Brand", BrandSchema);

module.exports = BrandModel;