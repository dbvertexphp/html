const mongoose = require("mongoose");

const CarNameSchema = mongoose.Schema({
    name: { type: String, required: true },
    make_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Brand",
    },
    status: { type: String, enum: ["0", "1"], default: "1" },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    deleted_at: { type: Date, default: null },
});

const CarNameModel = mongoose.model("CarNameModel", CarNameSchema);

module.exports = CarNameModel;