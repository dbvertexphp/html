const mongoose = require("mongoose");

const WebsiteSchema = mongoose.Schema({
    banner_images: {
        image1: { type: String },
        image2: { type: String },
        image3: { type: String },
        image4: { type: String },
        image5: { type: String },
        image6: { type: String },
    },
    about: { text: { type: String }, image: { type: String } },
    logo: { type: String },
    brands: [{
        image: { type: String },
        brand_name: { type: String },
        joined_since: { type: String },
    }],
    services: [{
        image: { type: String },
        service_name: { type: String },
        description: { type: String },
    }], testimonials: [
        {
            description: { type: String },
            image: { type: String },
            author: { type: String },
            designation: { type: String },
            location: { type: String },
        }
    ]
}, { timestamps: true });



const WebsiteModel = mongoose.model("Website", WebsiteSchema);

module.exports = { WebsiteModel };