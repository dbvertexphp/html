const { getAllCustomers, PhoneLogin, addCustomer, CustomerLogin, getCustomerByID, UpdateCustomerByID, DeleteCustomerByID, CustomerEmailVerification, ChangePassword, getCustomerSList } = require("../Controllers/Customer.controller");
const Authentication = require("../Middlewares/Authentication.middleware");


const CustomerRouter = require("express").Router();

CustomerRouter.get("/", (req, res) => res.status(200).send({ message: "Welcome to Customer Route" }));

CustomerRouter.get("/get-all-customers", getAllCustomers);
CustomerRouter.get("/get-all-customers-list", getCustomerSList);
CustomerRouter.get("/get-customer/:id", getCustomerByID);

CustomerRouter.post("/register", addCustomer);
CustomerRouter.post("/verify", CustomerEmailVerification);
CustomerRouter.post("/login", CustomerLogin);
CustomerRouter.post("/phone-login", PhoneLogin);

CustomerRouter.patch("/update/:id", Authentication, UpdateCustomerByID);
CustomerRouter.patch("/change-pass/:id", Authentication, ChangePassword);

CustomerRouter.delete("/delete/:id", Authentication, DeleteCustomerByID);


module.exports = CustomerRouter;