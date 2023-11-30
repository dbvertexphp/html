const mongoose = require("mongoose");

const ColorSchema = mongoose.Schema({
    name: { type: String, required: true },
    code: { type: String, required: true },
    status: { type: String, enum: ["0", "1"], default: "1" },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    deleted_at: { type: Date, default: null },
});

const ColorModel = mongoose.model("color", ColorSchema);

module.exports = ColorModel;