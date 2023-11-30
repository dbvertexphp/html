const mongoose = require("mongoose");

const CarSchema = mongoose.Schema(
    {
        vendorID: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Vendor",
        },
        make: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Brand",
        },
        model: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "CarModel",
        },
        body_type: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "BodyType",
        },
        color: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "color",
        },
        location: [
            {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: "location",
            },
        ],
        current_test_drive: { type: mongoose.Schema.Types.ObjectId, ref: "TestDrive" },
        name: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "CarNameModel",
        },
        cname: { type: String },
        cmodel: { type: String },
        cmake: { type: String },
        ccolor: { type: String },
        cbody_type: { type: String },
        primary_image: { type: String, required: true },
        gallery_images: [],
        regYear: { type: String },
        discount: { type: Number },
        most_viewed: { type: Number },
        booking_status: { type: String, enum: ["available", "reopened", "closed", "booked"], default: "available" },
        payment_status: { type: String, enum: ["pending", "partially_paid", "paid"], default: "pending" },
        regState: {
            state_code: { type: String },
            state_name: { type: String }
        },
        price: { type: Number },
        engine_type: { type: String },
        mileage: { type: Number },
        condition: { type: String },
        transmission: { type: String },
        fuel_type: { type: String },
        engine_displacment: { type: Number },
        license_number: { type: String },
        features: { type: Array },
        safety_features: { type: Array },
        options: { type: String },
        VIN: { type: String },
        ownership_history: { type: String },
        warranty: { type: String },
        license_plate: { type: String },
        short_description: { type: String },
        description: { type: String },
        documents: [{
            label: { type: String },
            doc: { type: String }
        }],

        ownership: { type: String },
        km_driven: { type: Number },
        seats: { type: String },
        hidden: { type: Boolean },
        images: [{ type: String }],
        wheel_size: { type: String },
        status: {
            type: String,
            enum: [
                "pending",
                "under review",
                "rejected",
                "approved",
                "deactivate",
            ],
            default: "pending",
        },

        featured_car: { type: Number, enum: [0, 1], default: 0 },
        trending_car: { type: Number, enum: [0, 1], default: 0 },
        upcoming_car: { type: Number, enum: [0, 1], default: 0 },
        hotdeal_car: { type: Number, enum: [0, 1], default: 0 },

    },
    { timestamps: true }
);

const CarModel = mongoose.model("Car", CarSchema);

module.exports = CarModel;
