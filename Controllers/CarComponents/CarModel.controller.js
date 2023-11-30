const CarModelModel = require("../../Models/CarComponents/CarModel.model");

exports.addCarModel = async (req, res) => {
    const data = req.body;
    const isPresent = await CarModelModel.findOne({ name: data.name })
    if (isPresent) return res.status(401).json({ message: `data alredy Present with name ${data.name}` })

    try {
        const CarModel = new CarModelModel(data)
        await CarModel.save();
        return res.status(200).send({ message: "CarModel Created Successfully", CarModel });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: error?.message || "Something went Wrong", error });
    }
};

exports.getAllCarModels = async (req, res) => {
    let limit = req.query.limit || 10
    let page = req.query.page || 1
    page = page > 0 ? page : 1
    let skip = (page - 1) * limit || 0
    try {
        const CarModels = await CarModelModel.find().populate("make_id").sort({ _id: -1 }).limit(limit).skip(skip);
        const totalCarModels = await CarModelModel.find().count()
        const allCarModels = await CarModelModel.find()
        return res.status(200).send({ message: "All CarModels", CarModels, allCarModels, Count: CarModels.length, totalCarModels });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: error?.message || "Something went Wrong", error });
    }
};

exports.getCarModelByID = async (req, res) => {
    let id = req?.params?.id
    try {
        const CarModel = await CarModelModel.findById(id)
        return res.status(200).send({ message: "CarModel By ID", CarModel });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: error?.message || "Something went Wrong", error });
    }
};

exports.UpdateCarModelByID = async (req, res) => {
    let id = req?.params?.id
    let payload = req.body
    try {
        await CarModelModel.findByIdAndUpdate(id, payload)
        return res.status(200).send({ message: "Updated CarModel Successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: error?.message || "Something went Wrong", error });
    }
};
exports.DeleteCarModelByID = async (req, res) => {
    let id = req?.params?.id
    try {
        await CarModelModel.findByIdAndDelete(id)
        return res.status(200).send({ message: "CarModel Deleted Successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: error?.message || "Something went Wrong", error });
    }
};
