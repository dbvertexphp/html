const ColorModel = require("../../Models/CarComponents/Color.model");

exports.addColor = async (req, res) => {
    const data = req.body;
    const isPresent = await ColorModel.findOne({ name: data.name })
    if (isPresent) return res.status(401).json({ message: `data alredy Present with name ${data.name}` })
    try {
        const Color = new ColorModel(data)
        await Color.save();
        return res.status(200).send({ message: "Color Created Successfully", Color });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: error?.message || "Something went Wrong", error });
    }
};

exports.getAllColors = async (req, res) => {
    let limit = req.query.limit || 10
    let page = req.query.page || 1
    page = page > 0 ? page : 1
    let skip = (page - 1) * limit || 0
    try {
        const Colors = await ColorModel.find().sort({ _id: -1 }).limit(limit).skip(skip);
        const totalColors = await ColorModel.find().count()
        const allColors = await ColorModel.find()
        return res.status(200).send({ message: "All Colors", Colors, allColors, Count: Colors.length, totalColors });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: error?.message || "Something went Wrong", error });
    }
};

exports.getColorByID = async (req, res) => {
    let id = req?.params?.id
    try {
        const Color = await ColorModel.findById(id).select({ password: 0 })
        return res.status(200).send({ message: "Color By ID", Color });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: error?.message || "Something went Wrong", error });
    }
};

exports.UpdateColorByID = async (req, res) => {
    let id = req?.params?.id
    let payload = req.body
    try {
        await ColorModel.findByIdAndUpdate(id, payload)
        return res.status(200).send({ message: "Updated Color Successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: error?.message || "Something went Wrong", error });
    }
};
exports.DeleteColorByID = async (req, res) => {
    let id = req?.params?.id
    try {
        await ColorModel.findByIdAndDelete(id)
        return res.status(200).send({ message: "Color Deleted Successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: error?.message || "Something went Wrong", error });
    }
};
