const CarNameModel = require('../../Models/CarComponents/CarName.model');
const CarModel = require('../../Models/Car.model');

exports.addCarName = async (req, res) => {
  const data = req.body;
  const isPresent = await CarNameModel.findOne({ name: data.name });
  if (isPresent) return res.status(401).json({ message: `data alredy Present with name ${data.name}` });
  try {
    const CarName = new CarNameModel(data);
    await CarName.save();
    return res.status(200).send({ message: 'CarName Created Successfully', CarName });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error?.message || 'Something went Wrong', error });
  }
};

exports.getCarNames = async (req, res) => {
  let limit = req.query.limit || 10;
  let page = req.query.page || 1;
  page = +page > 0 ? page : 1;
  let skip = (page - 1) * limit || 0;

  try {
    const CarNames = await CarNameModel.find().sort({ _id: -1 }).populate('make_id').limit(limit).skip(skip);
    const totalCarNames = await CarNameModel.find().count();
    const allCarNames = await CarNameModel.find();

    return res.status(200).send({ message: 'All CarNames', CarNames, allCarNames, Count: CarNames.length, totalCarNames });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error?.message || 'Something went Wrong', error });
  }
};
exports.getAllCarNames = async (req, res) => {
  try {
    const CarNames = await CarNameModel.find();

    return res.status(200).send({ message: 'All CarNames', CarNames });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error?.message || 'Something went Wrong', error });
  }
};
exports.getCarsByNameSreach = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Please provide a car name.' });
    }

    // Check if 'name' is an object, and extract the 'name' property if it exists
    const searchName = typeof name === 'object' ? name.name : name;

    // Using a regular expression to find car names that contain the provided substring
    const cars = await CarNameModel.find({ name: { $regex: searchName, $options: 'i' } });

    return res.status(200).json({ message: 'Cars found by name', cars });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error?.message || 'Something went wrong', error });
  }
};

exports.getAllCar_Id = async (req, res) => {
  try {
    // Fetch all cars with Car_id field
    const cars = await CarModel.find({ Car_id: { $exists: true } }, '_id Car_id');

    // Check if there are no cars with Car_id
    if (!cars || cars.length === 0) {
      return res.status(404).send({ message: 'No cars with Car_id found' });
    }

    const carDetails = cars.map(car => ({
      _id: car._id,
      Car_id: car.Car_id
    }));

    return res.status(200).send({ message: 'Car details', carDetails });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: error?.message || 'Something went wrong', error });
  }
};

exports.UpdateCarNameByID = async (req, res) => {
  let id = req?.params?.id;
  let payload = req.body;
  try {
    await CarNameModel.findByIdAndUpdate(id, payload);
    return res.status(200).send({ message: 'Updated CarName Successfully' });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error?.message || 'Something went Wrong', error });
  }
};

exports.DeleteCarNameByID = async (req, res) => {
  let id = req?.params?.id;
  try {
    await CarNameModel.findByIdAndDelete(id);
    return res.status(200).send({ message: 'CarName Deleted Successfully' });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error?.message || 'Something went Wrong', error });
  }
};
