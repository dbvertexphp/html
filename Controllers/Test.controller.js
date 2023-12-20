const CarModel = require("../Models/Car.model");
const CustomerModel = require("../Models/Customer.model");
const VendorModel = require("../Models/Vendor.model");
const BookingModel = require("../Models/Booking.model");
const TestDriveModel = require("../Models/TestDrive.model");
const UserModel = require("../Models/User.model");
const EmployeeModel = require("../Models/EmployeeModel");
const TransactionModel = require("../Models/Transaction.model");
const WishlistModel = require("../Models/Wishlist.model");


exports.getDashboardData = async (req, res) => {
    try {
        const Cars = await CarModel.find().count()
        const Vendors = await VendorModel.find().count()
        const Employees = await EmployeeModel.find().count()
        const Users = await UserModel.find().count()
        const Bookings = await BookingModel.find().count()
        const Customers = await CustomerModel.find().count()
        const Tdrives = await TestDriveModel.find().count()
        const Transactions = await TransactionModel.find().count()
        return res.status(200).send({ message: "Dashboard", Cars, Vendors, Customers, Bookings, Tdrives, Employees, Users, Transactions });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: error?.message || "Something went Wrong", error });
    }
};
exports.getVendorDashboardDataByID = async (req, res) => {
    let id = req.params.id
    try {
        const Bookings = await BookingModel.find({ vendor_id: id }).count()
        const Tdrives = await TestDriveModel.find({ vendor_id: id }).count()
        const AllTransaction = await TransactionModel.find().populate("car_id")
        let temp = []
        for (const trans of AllTransaction) {
            if (trans?.car_id?.vendorID == id) {
                temp.push(trans)
            }
        }
        return res.status(200).send({ message: "Vendor Dashboard", Bookings, Tdrives, Transactions: temp.length });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: error?.message || "Something went Wrong", error });
    }
};

exports.getEmployeeDashboardDataByID = async (req, res) => {
    let id = req.params.id
   
    try {
       
        const Vendors = await VendorModel.find({ reference: id }).count()
        const Vendor = await VendorModel.find({ reference: id })
        const Bookings = await BookingModel.find({ vendor_id: Vendor._id }).count()
        const Tdrives = await TestDriveModel.find({ vendor_id: Vendor._id }).count()
        const Cars = await CarModel.find({ vendorID: Vendor._id }).count()
        return res.status(200).send({ message: "Vendor Dashboard", Vendors ,Tdrives, Bookings,Cars});
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: error?.message || "Something went Wrong", error });
    }
};
exports.getSales = async (req, res) => {
    try {
        const Transactions = await TransactionModel.find({ status: "PAYMENT_SUCCESS" })
        let daily = 0
        let monthly = 0
        let total = 0
        for (const trxn of Transactions) {
            let x = trxn.amount_to_pay
            const date = new Date(trxn.createdAt);
            let currdate = new Date()
            let trxnday = date.getUTCDate();
            let trxnmonth = date.getUTCMonth() + 1;
            let trxnyear = date.getUTCFullYear();
            let currday = currdate.getDate()
            let currmonth = currdate.getMonth() + 1
            let curryear = currdate.getFullYear()
            if (trxnday == currday && trxnmonth == currmonth && trxnyear == curryear) daily += x
            if (trxnmonth == currmonth && trxnyear == curryear) monthly += x
            total += x
        }
        return res.status(200).send({ message: "Transaction data", daily, monthly, total });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: error?.message || "Something went Wrong", error });
    }
};


exports.getAllVendorsByEmployee = async (req, res) => {
  let id = req.params.id;
  

  
  let limit = req.query.limit || 50
  let page = req.query.page || 1
  page = page > 0 ? page : 1
  let skip = (page - 1) * limit || 0

 
  
  try {
    
     
      const Cars = await VendorModel.find( {reference : id}).limit(limit).skip(skip).sort({ created_at: -1 });
      const totalVendors = await VendorModel.find({reference : id}).count()
      return res.status(200).send({ message: "All Vendors", Cars, Count: Cars.length, totalVendors });
  } catch (error) {
      console.log(error);
      return res.status(500).send({ message: error?.message || "Something went Wrong", error });
  }
};
  
  exports.getAllCarsByEmployeeID = async (req, res) => {
    const { id } = req.params;
    let sortby = req.body.sortby || "createdAt";
    let sort_index =
      sortby === "low_to_high" ? 1 : sortby === "high_to_low" ? -1 : 0;
    let sortObj = {};
    sortby = sortby || "createdAt";
  
    sort_index == 0
      ? (sortObj = { [sortby]: -1 })
      : (sortObj = { price: sort_index });
  
    let limit = req.query.limit || 50;
    let page = req.query.page || 1;
    page = page > 0 ? page : 1;
    let skip = (page - 1) * limit || 0;
  
    try {
      if (!id) return res.status(401).send({ message: "Vendor ID not Provided" });
  
      const Vendors = await VendorModel.find({ reference: id }).select({ _id: 1 });
  
      const allCars = [];
      for (const vendor of Vendors) {
        const query = { vendorID: vendor._id };
        console.log(query);
        
        const cars = await CarModel.find(query)
          .limit(limit)
          .skip(skip)
          .sort(sortObj);
  
        allCars.push(...cars);
      }
  
      const totalCars = allCars.length;
      return res.status(200).send({
        message: "All Cars",
        cars: allCars,
        Count: totalCars,
        totalCars,
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send({ message: error?.message || "Something went wrong", error });
    }
  };
  exports.getAllTestdriveByEmployeeID = async (req, res) => {
    const { id } = req.params;
    let sortby = req.body.sortby || "createdAt";
    let sort_index =
      sortby === "low_to_high" ? 1 : sortby === "high_to_low" ? -1 : 0;
    let sortObj = {};
    sortby = sortby || "createdAt";
  
    sort_index == 0
      ? (sortObj = { [sortby]: -1 })
      : (sortObj = { price: sort_index });
  
    let limit = req.query.limit || 50;
    let page = req.query.page || 1;
    page = page > 0 ? page : 1;
    let skip = (page - 1) * limit || 0;
  
    try {
      if (!id) return res.status(401).send({ message: "Vendor ID not Provided" });
  
      const Vendors = await VendorModel.find({ reference: id }).select({ _id: 1 });
  
      const allCars = [];
      for (const vendor of Vendors) {
        const query = { vendor_id: vendor._id };
        console.log(query);
        
        const cars = await TestDriveModel.find(query)
          .limit(limit)
          .skip(skip)
          .sort(sortObj)
          .populate(["name", "vendor_id", "customer_id"]).populate({
            path: 'car_id', populate: [
                { path: 'name', model: 'CarNameModel', },
                { path: 'make', model: 'Brand' },
                { path: 'model', model: 'CarModel' },
            ]
        });
  
        allCars.push(...cars);
      }
  
      const totalCars = allCars.length;
      return res.status(200).send({
        message: "All Cars",
        cars: allCars,
        Count: totalCars,
        totalCars,
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send({ message: error?.message || "Something went wrong", error });
    }
  };

  exports.getAllBookingByEmployeeID = async (req, res) => {
    const { id } = req.params;
    let sortby = req.body.sortby || "createdAt";
    let sort_index =
      sortby === "low_to_high" ? 1 : sortby === "high_to_low" ? -1 : 0;
    let sortObj = {};
    sortby = sortby || "createdAt";
  
    sort_index == 0
      ? (sortObj = { [sortby]: -1 })
      : (sortObj = { price: sort_index });
  
    let limit = req.query.limit || 50;
    let page = req.query.page || 1;
    page = page > 0 ? page : 1;
    let skip = (page - 1) * limit || 0;
  
    try {
      if (!id) return res.status(401).send({ message: "Vendor ID not Provided" });
  
      const Vendors = await VendorModel.find({ reference: id }).select({ _id: 1 });
  
      const allCars = [];
      for (const vendor of Vendors) {
        const query = { vendor_id: vendor._id };
        console.log(query);
        
        const cars = await BookingModel.find(query)
          .limit(limit)
          .skip(skip)
          .sort(sortObj);
  
        allCars.push(...cars);
      }
  
      const totalCars = allCars.length;
      return res.status(200).send({
        message: "All Cars",
        cars: allCars,
        Count: totalCars,
        totalCars,
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send({ message: error?.message || "Something went wrong", error });
    }
  };

  exports.getCarByID = async (req, res) => {
    let id = req?.params?.id;
    let populateArr = [
      "name",
      "color",
      "make",
      "body_type",
      "location",
      "model",
      "vendorID",
    ]
    try {
      const Car = await CarModel.findById(id).populate(populateArr);
      let similarCars = await CarModel.find({ make: Car?.make?._id }).populate(populateArr);
  
      similarCars = similarCars.filter((el) => {
  
        return (el._id).toString() !== id
      })
  
      return res.status(200).send({ message: "Car By ID", Car, similarCars });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: error?.message || "Something went Wrong", error });
    }
  };
  exports.addWishlist = async (req, res) => {
    let payload = req.body
    let { carId, userId } = req.body
    const test = { carId, userId}

    for (const key in test) {
        if (!test[key]) return res.status(401).json({ message: `Please Provide ${key}, Mandatory field missing: ${key}` })
    }
    try {
       
            const instance = new WishlistModel(payload)
            await instance.save()
            return res.status(200).json({ message: "Wishlist added Successfully", instance });
       
    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: error?.message || "Something went wrong", error })
    }
}
exports.removeWishlist = async (req, res) => {
  try {
    const car_id = req.params.carId;
    const user_id = req.params.userId;

    // Check if the item exists in the wishlist
    //const isInWishlist = await WishlistModel.findOne({ user_id, car_id });
    await WishlistModel.findOneAndDelete({ carId:car_id, userId:user_id });
    return res.status(200).send({ message: "Remove Wishlist Successfully" });
  } catch (error) {
    console.error('Error checking wishlist status:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
