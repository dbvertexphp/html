const CarModel = require('../Models/Car.model');
const SendMail = require('../Config/Sendmail');
const { CarAddedVendor, CarAddedAdmin } = require('../Email/CarTemplates/CarAdded');
const EmployeeModel = require('../Models/EmployeeModel');
const { CarApprovedEmployee, CarApprovedVendor, CarApprovedAdmin } = require('../Email/CarTemplates/CarApproved');
const WishlistModel = require('../Models/Wishlist.model');
let populateArr = ['name', 'color', 'make', 'body_type', 'location', 'model', 'vendorID'];

exports.addCar = async (req, res) => {
  const data = req.body;
  try {
    const Car = new CarModel(data);
    await Car.save();
    let car = await CarModel.findById(Car?._id).populate(populateArr);

    let vendoremail = car?.vendorID?.email;

    vendoremail && SendMail({ recipientEmail: vendoremail, subject: 'Car Added Successfully', html: CarAddedVendor(car) });
    SendMail({ recipientEmail: '', subject: 'New Car Added', html: CarAddedAdmin(car) });

    return res.status(200).send({ message: 'Car Created Successfully', Car });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error?.message || 'Something went Wrong', error });
  }
};

exports.getCarsWithPagination = async (req, res) => {
  let { filters, sortby, search } = req.body;

  let sort_index = sortby === 'low_to_high' ? 1 : sortby === 'high_to_low' ? -1 : 0;
  let sortObj = {};
  sortby = sortby || 'createdAt';
  sort_index == 0 ? (sortObj = { [sortby]: -1 }) : (sortObj = { price: sort_index });

  let limit = req.body.limit || 9;
  let page = req.body.page || 1;
  page = page > 0 ? page : 1;
  let skip = (page - 1) * limit || 0;

  try {
    let totalCars, Cars;

    if ((search && search !== '') || (search && search !== undefined)) {
      search = { ...search, status: 'approved' };

      // Check if 'name' property is present in search
      if (search.name) {
        totalCars = await CarModel.find(search).count();
        Cars = await CarModel.find(search).populate(populateArr).sort({ createdAt: -1 }).limit(limit).skip(skip);
      } else if (search.carIds) {
        // If 'carIds' property is present in search, search by 'Car_id'
        search = {
          Car_id: { $regex: new RegExp(search.carIds.label, 'i') },
          status: 'approved'
        };

        totalCars = await CarModel.find(search).count();
        Cars = await CarModel.find(search).populate(populateArr).sort({ createdAt: -1 }).limit(limit).skip(skip);
      }
    } else {
      let FilterArr = [];
      if (filters?.location) FilterArr.push({ location: { $in: [filters.location] } });
      if (filters?.brands?.length > 0) FilterArr.push({ cmake: { $in: filters.brands } });
      if (filters?.bodytypes?.length > 0) FilterArr.push({ cbody_type: { $in: filters.bodytypes } });
      if (filters?.transmission?.length > 0) FilterArr.push({ transmission: { $in: filters.transmission } });
      if (filters?.colors?.length > 0) FilterArr.push({ ccolor: { $in: filters.colors } });
      if (filters?.features?.length > 0) FilterArr.push({ features: { $in: filters.features } });
      if (filters?.seats?.length > 0) FilterArr.push({ seats: { $in: filters.seats } });
      if (filters?.owners?.length > 0) FilterArr.push({ owners: { $in: filters.owners } });
      if (filters?.minPrice || filters?.maxPrice)
        FilterArr.push({
          price: { $gte: filters?.minPrice, $lte: filters?.maxPrice }
        });
      if (filters?.minKms || filters?.maxKms)
        FilterArr.push({
          km_driven: { $gte: filters?.minKms, $lte: filters?.maxKms }
        });
      FilterArr.push({ status: 'approved' });

      if (FilterArr.length > 0) {
        totalCars = await CarModel.find({ $and: FilterArr }).count();
        Cars = await CarModel.find({ $and: FilterArr }).populate(populateArr).sort(sortObj).limit(limit).skip(skip);
      } else {
        totalCars = await CarModel.find({ status: 'approved' }).count();
        Cars = await CarModel.find({ status: 'approved' }).populate(populateArr).sort(sortObj).limit(limit).skip(skip);
      }
    }
    return res.status(200).send({ message: 'All Cars', Page: page, Count: Cars.length, Cars, totalCars });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error?.message || 'Something went Wrong', error });
  }
};
exports.getAllCars = async (req, res) => {
  try {
    let totalCars = await CarModel.find().count();
    let Cars = await CarModel.find().populate(populateArr);

    return res.status(200).send({ message: 'All Cars', Cars, totalCars });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error?.message || 'Something went Wrong', error });
  }
};

exports.getAllCarsAdmin = async (req, res) => {
  let { sortby, search } = req.body;

  let limit = 50;

  let page = req.body.page || 1;
  page = page > 0 ? page : 1;
  let skip = (page - 1) * limit || 0;

  let sort_index = sortby === 'low_to_high' ? 1 : sortby === 'high_to_low' ? -1 : 0;
  let sortObj = {};
  sortby = sortby || 'createdAt';
  sort_index == 0 ? (sortObj = { [sortby]: -1 }) : (sortObj = { price: sort_index });

  try {
    let totalCars = await CarModel.find().count();
    if (search !== '' && search !== undefined) {
      const Cars = await CarModel.find(search).populate(populateArr).sort({ createdAt: -1 });
      return res.status(200).send({ message: 'All Cars', Cars });
    } else {
      const Cars = await CarModel.find().limit(limit).skip(skip).populate(populateArr).sort(sortObj);

      return res.status(200).send({ message: 'All Cars Admin', Cars, totalCars });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error?.message || 'Something went Wrong', error });
  }
};

exports.getAllCarsForHome = async (req, res) => {
  try {
    const user_id = req.params.id || null;
    //const user_id = '65706f4edd84879558fce0a5' || null;
    const Trendings = await getLikeStatus('approved', 1, 15, user_id, 'trending_car');
    const HotDeals = await getLikeStatus('approved', 1, 15, user_id, 'hotdeal_car');
    const Featured = await getLikeStatus('approved', 1, 15, user_id, 'featured_car');
    const Upcomings = await getLikeStatus('approved', 1, 15, user_id, 'upcoming_car');

    return res.status(200).send({
      message: 'All Cars For HomePage',
      Trendings,
      HotDeals,
      Featured,
      Upcomings
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error?.message || 'Something went Wrong', error });
  }
};

async function getLikeStatus(status, condition, size, user_id, flag) {
  const cars = await CarModel.find({ status, [`${flag}`]: 1 })
    .limit(size)
    .sort({ createdAt: -1 });

  // If user_id is null, set default Like_status to 'No'
  if (!user_id) {
    return cars.map(car => ({ ...car.toObject(), Like_status: 'No' }));
  }

  // For each car, check Like_status
  const carsWithLikeStatus = await Promise.all(
    cars.map(async car => {
      car.Like_status = await checkWishlist(user_id, car._id);
      return car;
    })
  );

  // Include Like_status in response
  return carsWithLikeStatus.map(car => ({
    ...car.toObject(),
    Like_status: car.Like_status
  }));
}

async function checkWishlist(user_id, car_id) {
  const wishlist = await WishlistModel.findOne({ userId: user_id, carId: car_id });
  return wishlist ? 'Yes' : 'No';
}
exports.getAllCarsByVendor = async (req, res) => {
  let id = req.params.id;

  let sortby = req.body.sortby || 'createdAt';

  let sort_index = sortby === 'low_to_high' ? 1 : sortby === 'high_to_low' ? -1 : 0;
  let sortObj = {};
  sortby = sortby || 'createdAt';

  sort_index == 0 ? (sortObj = { [sortby]: -1 }) : (sortObj = { price: sort_index });

  let limit = req.query.limit || 5;
  let page = req.query.page || 1;
  page = page > 0 ? page : 1;
  let skip = (page - 1) * limit || 0;

  try {
    if (!id) return res.status(401).send({ message: 'Vendor ID not Provided' });

    const Cars = await CarModel.find({ vendorID: id })
      .limit(limit)
      .skip(skip)
      .populate(['name', 'color', 'make', 'body_type', 'location', 'model', 'vendorID'])
      .sort(sortObj);
    const totalCars = await CarModel.find({ vendorID: id }).count();
    return res.status(200).send({
      message: 'All Cars By Vendor',
      Cars,
      Count: Cars.length,
      totalCars
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error?.message || 'Something went Wrong', error });
  }
};
exports.getCarByID = async (req, res) => {
  let id = req?.params?.id;
  let populateArr = ['name', 'color', 'make', 'body_type', 'location', 'model', 'vendorID'];
  try {
    const Car = await CarModel.findById(id).populate(populateArr);
    let similarCars = await CarModel.find({ make: Car?.make?._id }).populate(populateArr);

    similarCars = similarCars.filter(el => {
      return el._id.toString() !== id;
    });

    return res.status(200).send({ message: 'Car By ID', Car, similarCars });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error?.message || 'Something went Wrong', error });
  }
};
exports.getSimilarCars = async (req, res) => {
  let id = req?.params?.id;
  const user_id = req.params.user_id || null;
  //const user_id = '65706f4edd84879558fce0a5' || null;
  try {
    const Car = await CarModel.findById(id).populate(populateArr);
    let similarCars = await CarModel.find({ make: Car?.make?._id, status: 'approved' }).populate(populateArr);
    similarCars = similarCars.filter(el => el._id.toString() !== id.toString());

    // Fetch likeStatus for each similar car and include it in the response
    const similarCarsWithLikeStatus = await Promise.all(
      similarCars.map(async similarCar => {
        const likeStatus = await checkWishlist(user_id, similarCar._id); // Change the second parameter based on your criteria
        return { ...similarCar._doc, likeStatus }; // Include likeStatus in the response
      })
    );

    return res.status(200).send({ message: 'Car By ID', Car, similarCars: similarCarsWithLikeStatus });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error?.message || 'Something went Wrong', error });
  }
};

exports.UpdateCarByID = async (req, res) => {
  let id = req?.params?.id;
  let payload = req.body;
  try {
    let car = await CarModel.findById(id)?.populate(populateArr);
    if (!car) return res.status(400).send({ message: 'Car Not Found' });
    if (payload.updateType == 'statusUpdate' && payload.status == 'approved') {
      let vendoremail = car?.vendorID?.email;
      let employeeID = car?.vendorID?.reference;
      let employee = await EmployeeModel.findById(employeeID);

      SendMail({ recipientEmail: '', subject: 'Car Approved', html: CarApprovedAdmin(car) });
      vendoremail && SendMail({ recipientEmail: vendoremail, subject: 'Car Apporved', html: CarApprovedVendor(car) });
      employee?.email && SendMail({ recipientEmail: employee?.email, subject: 'Car Apporved', html: CarApprovedEmployee(car, employee) });
    }
    await CarModel.findByIdAndUpdate(id, payload);
    return res.status(200).send({ message: 'Updated Car Successfully' });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error?.message || 'Something went Wrong', error });
  }
};
exports.DeleteCarByID = async (req, res) => {
  let id = req?.params?.id;
  try {
    await CarModel.findByIdAndDelete(id);
    return res.status(200).send({ message: 'Car Deleted Successfully' });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error?.message || 'Something went Wrong', error });
  }
};
