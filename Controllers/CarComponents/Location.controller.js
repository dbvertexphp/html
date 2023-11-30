const LocationModel = require("../../Models/CarComponents/Location.model");

exports.addLocation = async (req, res) => {
    const data = req.body;
    const isPresent = await LocationModel.findOne({ name: data.name })
    if (isPresent) return res.status(401).json({ message: `data alredy Present with name ${data.name}` })
    try {
        const Location = new LocationModel(data)
        await Location.save();
        return res.status(200).send({ message: "Location Created Successfully", Location });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: error?.message || "Something went Wrong", error });
    }
};

exports.getLocations = async (req, res) => {
    let limit = req.query.limit || 10
    let page = req.query.page || 1
    page = page > 0 ? page : 1
    let skip = (page - 1) * limit || 0
    try {
        const Locations = await LocationModel.find().sort({ _id: -1 }).limit(limit).skip(skip)
        const totalLocations = await LocationModel.find().count()
        const allLocations = await LocationModel.find()
        return res.status(200).send({ message: "All Locations", Locations, allLocations, Count: Locations.length, totalLocations });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: error?.message || "Something went Wrong", error });
    }
};
exports.getAllLocations = async (req, res) => {
    try {
        const locations = await LocationModel.find()
        return res.status(200).send({ message: "Locations", locations });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: error?.message || "Something went Wrong", error });
    }
};

exports.getLocationByID = async (req, res) => {
    let id = req?.params?.id
    try {
        const Location = await LocationModel.findById(id).select({ password: 0 })
        return res.status(200).send({ message: "Location By ID", Location });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: error?.message || "Something went Wrong", error });
    }
};

exports.UpdateLocationByID = async (req, res) => {
    let id = req?.params?.id
    let payload = req.body
    try {
        await LocationModel.findByIdAndUpdate(id, payload)
        return res.status(200).send({ message: "Updated Location Successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: error?.message || "Something went Wrong", error });
    }
};
exports.DeleteLocationByID = async (req, res) => {
    let id = req?.params?.id
    try {
        await LocationModel.findByIdAndDelete(id)
        return res.status(200).send({ message: "Location Deleted Successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: error?.message || "Something went Wrong", error });
    }
};
