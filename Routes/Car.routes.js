const {
  getAllCars,
  getCarByID,
  addCar,
  UpdateCarByID,
  DeleteCarByID,
  getAllCarsByVendor,
  getAllCarsForHome,
  getAllCarsAdmin,
  getSimilarCars,
  getCarsWithPagination,
  addCarIdsToExistingRecords
} = require('../Controllers/Car.controller');
const Authentication = require('../Middlewares/Authentication.middleware');

const CarRouter = require('express').Router();

CarRouter.get('/', (req, res) => res.status(200).send({ message: 'Welcome to Car Route' }));

CarRouter.get('/get-car/:id', getCarByID);

CarRouter.post('/get-cars', getCarsWithPagination);
CarRouter.post('/get-all-cars', getAllCars);
CarRouter.post('/get-all-cars-admin', getAllCarsAdmin);
CarRouter.post('/get-all-cars-home/:id', getAllCarsForHome);
CarRouter.post('/get-all-vendor-car/:id', getAllCarsByVendor);
CarRouter.get('/get-similar-cars/:user_id/:id', getSimilarCars);
CarRouter.get('/addCarIdsToExistingRecords', addCarIdsToExistingRecords);
CarRouter.post('/add-car', Authentication, addCar);

CarRouter.patch('/update-car-admin/:id', Authentication, UpdateCarByID);
CarRouter.patch('/update-car/:id', Authentication, UpdateCarByID);

CarRouter.delete('/delete-car/:id', Authentication, DeleteCarByID);

module.exports = CarRouter;
