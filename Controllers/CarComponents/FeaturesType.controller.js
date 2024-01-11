const FeaturesModel = require('../../Models/CarComponents/FeaturesType.model');

exports.addFeatures = async (req, res) => {
  const data = req.body;
  const isPresent = await FeaturesModel.findOne({ name: data.name });
  if (isPresent) return res.status(401).json({ message: `data alredy Present with name ${data.name}` });
  try {
    const Features = new FeaturesModel(data);
    await Features.save();
    return res.status(200).send({ message: 'Features Created Successfully', Features });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error?.message || 'Something went Wrong', error });
  }
};

exports.getAllFeaturess = async (req, res) => {
  let limit = req.query.limit || 10;
  let page = req.query.page || 1;
  page = page > 0 ? page : 1;
  let skip = (page - 1) * limit || 0;
  try {
    const Featuress = await FeaturesModel.find().sort({ _id: -1 }).limit(limit).skip(skip);
    const totalFeaturess = await FeaturesModel.find().count();
    const allFeaturess = await FeaturesModel.find();
    return res.status(200).send({ message: 'All Featuress', Featuress, allFeaturess, Count: Featuress.length, totalFeaturess });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error?.message || 'Something went Wrong', error });
  }
};

exports.getFeaturesByID = async (req, res) => {
  let id = req?.params?.id;
  try {
    const Features = await FeaturesModel.findById(id).select({ password: 0 });
    return res.status(200).send({ message: 'Features By ID', Features });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error?.message || 'Something went Wrong', error });
  }
};

exports.UpdateFeaturesByID = async (req, res) => {
  let id = req?.params?.id;
  let payload = req.body;
  try {
    await FeaturesModel.findByIdAndUpdate(id, payload);
    return res.status(200).send({ message: 'Updated Features Successfully' });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error?.message || 'Something went Wrong', error });
  }
};
exports.DeleteFeaturesByID = async (req, res) => {
  let id = req?.params?.id;
  try {
    await FeaturesModel.findByIdAndDelete(id);
    return res.status(200).send({ message: 'Features Deleted Successfully' });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error?.message || 'Something went Wrong', error });
  }
};
