const mongoose = require("mongoose");

const RoleSchema = mongoose.Schema({
    label: { type: String, required: true },
    type: { type: "String", enum: ["Admin", "User"] }
},
    {
        timestamps: true,
    });

const RoleModel = mongoose.model("Role", RoleSchema);

module.exports = RoleModel;