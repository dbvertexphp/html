const { getAllBodyType, addBodyType, UpdateBodyTypeByID, DeleteBodyTypeByID } = require('../Controllers/CarComponents/BodyType.controller');
const {
  getAllCarModels,
  getCarModelByID,
  addCarModel,
  UpdateCarModelByID,
  DeleteCarModelByID
} = require('../Controllers/CarComponents/CarModel.controller');
const {
  getAllCarNames,
  addCarName,
  UpdateCarNameByID,
  DeleteCarNameByID,
  getCarNames,
  getAllCar_Id,
  getCarsByIDSreach,
  getCarsByNameSreach
} = require('../Controllers/CarComponents/CarName.controller');
const { getAllColors, getColorByID, addColor, UpdateColorByID, DeleteColorByID } = require('../Controllers/CarComponents/Color.controller');
const {
  getAllLocations,
  getLocationByID,
  addLocation,
  UpdateLocationByID,
  DeleteLocationByID,
  getLocations
} = require('../Controllers/CarComponents/Location.controller');
const { getAllMakes, getMakeByID, addMake, UpdateMakeByID, DeleteMakeByID } = require('../Controllers/CarComponents/Make.controller');
const {
  addFeatures,
  getAllFeaturess,
  getFeaturesByID,
  UpdateFeaturesByID,
  DeleteFeaturesByID
} = require('../Controllers/CarComponents/FeaturesType.controller');
const Authentication = require('../Middlewares/Authentication.middleware');

const BodyTypeRouter = require('express').Router();

BodyTypeRouter.get('/', (req, res) => res.status(200).send({ message: 'Welcome to Body Type Route' }));
BodyTypeRouter.get('/get-all-bodytype', getAllBodyType);
BodyTypeRouter.post('/add-bodytype', Authentication, addBodyType);
BodyTypeRouter.patch('/update-bodytype/:id', Authentication, UpdateBodyTypeByID);
BodyTypeRouter.delete('/delete-bodytype/:id', Authentication, DeleteBodyTypeByID);

const CarModelRouter = require('express').Router();

CarModelRouter.get('/', (req, res) => res.status(200).send({ message: 'Welcome to Car Model Route' }));
CarModelRouter.get('/get-all-carmodel', getAllCarModels);
CarModelRouter.get('/get-carmodel/:id', getCarModelByID);
CarModelRouter.post('/add-carmodel', Authentication, addCarModel);
CarModelRouter.patch('/update-carmodel/:id', Authentication, UpdateCarModelByID);
CarModelRouter.delete('/delete-carmodel/:id', Authentication, DeleteCarModelByID);

const MakeRouter = require('express').Router();

MakeRouter.get('/', (req, res) => res.status(200).send({ message: 'Welcome to Make Route' }));
MakeRouter.get('/get-all-make', getAllMakes);
MakeRouter.get('/get-make/:id', getMakeByID);
MakeRouter.post('/add-make', Authentication, addMake);
MakeRouter.patch('/update-make/:id', Authentication, UpdateMakeByID);
MakeRouter.delete('/delete-make/:id', Authentication, DeleteMakeByID);

const FeaturesRouter = require('express').Router();

FeaturesRouter.get('/', (req, res) => res.status(200).send({ message: 'Welcome to Feature Route' }));
FeaturesRouter.post('/add-features', Authentication, addFeatures);
FeaturesRouter.get('/get-all-features', getAllFeaturess);
FeaturesRouter.get('/get-features/:id', getFeaturesByID);
FeaturesRouter.patch('/update-features/:id', Authentication, UpdateFeaturesByID);
FeaturesRouter.delete('/delete-features/:id', Authentication, DeleteFeaturesByID);

const ColorRouter = require('express').Router();

ColorRouter.get('/', (req, res) => res.status(200).send({ message: 'Welcome to Color Route' }));
ColorRouter.get('/get-all-color', getAllColors);
ColorRouter.get('/get-color/:id', getColorByID);
ColorRouter.post('/add-color', Authentication, addColor);
ColorRouter.patch('/update-color/:id', Authentication, UpdateColorByID);
ColorRouter.delete('/delete-color/:id', Authentication, DeleteColorByID);

const LocationRouter = require('express').Router();

LocationRouter.get('/', (req, res) => res.status(200).send({ message: 'Welcome to Location Route' }));
LocationRouter.get('/get-locations', getLocations);
LocationRouter.get('/get-all-location', getAllLocations);
LocationRouter.get('/get-location/:id', getLocationByID);
LocationRouter.post('/add-location', Authentication, addLocation);
LocationRouter.patch('/update-location/:id', Authentication, UpdateLocationByID);
LocationRouter.delete('/delete-location/:id', Authentication, DeleteLocationByID);

const CarNameRouter = require('express').Router();

CarNameRouter.get('/', (req, res) => res.status(200).send({ message: 'Welcome to CarName Route' }));
CarNameRouter.get('/get-carname', getCarNames);
CarNameRouter.post('/get-carname-sreach', getCarsByNameSreach);
CarNameRouter.get('/get-all-carnames', getAllCarNames);
CarNameRouter.get('/get-all-carId', getAllCar_Id);
CarNameRouter.post('/get-carId-sreach', getCarsByIDSreach);
CarNameRouter.post('/add-carname', Authentication, addCarName);
CarNameRouter.patch('/update-carname/:id', Authentication, UpdateCarNameByID);
CarNameRouter.delete('/delete-carname/:id', Authentication, DeleteCarNameByID);

module.exports = { BodyTypeRouter, CarModelRouter, MakeRouter, ColorRouter, LocationRouter, CarNameRouter, FeaturesRouter };
