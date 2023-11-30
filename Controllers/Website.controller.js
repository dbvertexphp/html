const { WebsiteModel } = require("../Models/Website.model");


exports.getWebsiteData = async (req, res) => {
    try {
        const Data = await WebsiteModel.findOne()

        return res.status(200).send({ message: `Website Data`, Data });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: error.message || "Something went Wrong", error });
    }
}
exports.getAllBanners = async (req, res) => {
    try {
        const WebData = await WebsiteModel.findOne()

        return res.status(200).send({ message: `Banner images`, banner_images: WebData?.banner_images });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: error.message || "Something went Wrong", error });
    }
}
exports.getAllTestimonials = async (req, res) => {
    try {
        const WebData = await WebsiteModel.findOne()
        return res.status(200).send({ message: `All Testimonials `, testimonials: WebData?.testimonials });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: error.message || "Something went Wrong", error });
    }
}
exports.UpdateWebsiteData = async (req, res) => {
    let payload = req.body
    try {
        const WebData = await WebsiteModel.findOne()
        let id = WebData._id
        await WebsiteModel.findByIdAndUpdate(id, payload)
        return res.status(200).send({ message: `Updated successfully` });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: error.message || "Something went Wrong", error });
    }
}
