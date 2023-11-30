const mongoose = require("mongoose");

const BodyTypeSchema = mongoose.Schema({
    name: { type: String, required: true },
    status: { type: String, enum: ["0", "1"], default: "1" },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    deleted_at: { type: Date, default: null },
});

const BodyTypeModel = mongoose.model("BodyType", BodyTypeSchema);

module.exports = BodyTypeModel;