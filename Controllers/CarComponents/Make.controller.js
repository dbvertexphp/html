const BrandModel = require("../../Models/CarComponents/Make.model");

exports.addMake = async (req, res) => {
    const data = req.body;
    const isPresent = await BrandModel.findOne({ name: data.name })
    if (isPresent) return res.status(401).json({ message: `data alredy Present with name ${data.name}` })
    try {
        const Make = new BrandModel(data)
        await Make.save();
        return res.status(200).send({ message: "Make Created Successfully", Make });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: error?.message || "Something went Wrong", error });
    }
};

exports.getAllMakes = async (req, res) => {
    let limit = req.query.limit || 10
    let page = req.query.page || 1
    page = page > 0 ? page : 1
    let skip = (page - 1) * limit || 0
    try {
        const Makes = await BrandModel.find().sort({ _id: -1 }).limit(limit).skip(skip)
        const totalMakes = await BrandModel.find().count()
        const allMakes = await BrandModel.find()
        return res.status(200).send({ message: "All Makes", Makes, allMakes, Count: Makes.length, totalMakes });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: error?.message || "Something went Wrong", error });
    }
};

exports.getMakeByID = async (req, res) => {
    let id = req?.params?.id
    try {
        const Make = await BrandModel.findById(id).select({ password: 0 })
        return res.status(200).send({ message: "Make By ID", Make });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: error?.message || "Something went Wrong", error });
    }
};

exports.UpdateMakeByID = async (req, res) => {
    let id = req?.params?.id
    let payload = req.body
    try {
        await BrandModel.findByIdAndUpdate(id, payload)
        return res.status(200).send({ message: "Updated Make Successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: error?.message || "Something went Wrong", error });
    }
};
exports.DeleteMakeByID = async (req, res) => {
    let id = req?.params?.id
    try {
        await BrandModel.findByIdAndDelete(id)
        return res.status(200).send({ message: "Make Deleted Successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: error?.message || "Something went Wrong", error });
    }
};
