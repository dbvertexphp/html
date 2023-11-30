const BodyTypeModel = require("../../Models/CarComponents/BodyType.model");


exports.addBodyType = async (req, res) => {
    const data = req.body;

    const isPresent = await BodyTypeModel.findOne({ name: data.name })
    if (isPresent) return res.status(401).json({ message: `data alredy Present with name ${data.name}` })

    try {
        const BodyType = new BodyTypeModel(data)
        await BodyType.save();
        return res.status(200).send({ message: "BodyType Created Successfully", BodyType });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: error?.message || "Something went Wrong", error });
    }
};

exports.getAllBodyType = async (req, res) => {
    let limit = req.query.limit || 10
    let page = req.query.page || 1
    page = page > 0 ? page : 1
    let skip = (page - 1) * limit || 0
    try {
        const BodyTypes = await BodyTypeModel.find().sort({ _id: -1 }).limit(limit).skip(skip)
        const totalBodyTypes = await BodyTypeModel.find().count()
        const allBodyTypes = await BodyTypeModel.find()
        return res.status(200).send({ message: "All BodyType", BodyTypes, allBodyTypes, Count: BodyTypes.length, totalBodyTypes });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: error?.message || "Something went Wrong", error });
    }
};

exports.UpdateBodyTypeByID = async (req, res) => {
    let id = req?.params?.id
    let payload = req.body
    try {
        await BodyTypeModel.findByIdAndUpdate(id, payload)
        return res.status(200).send({ message: "Updated BodyType Successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: error?.message || "Something went Wrong", error });
    }
};

exports.DeleteBodyTypeByID = async (req, res) => {
    let id = req?.params?.id
    try {
        await BodyTypeModel.findByIdAndDelete(id)
        return res.status(200).send({ message: "BodyType Deleted Successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: error?.message || "Something went Wrong", error });
    }
};
