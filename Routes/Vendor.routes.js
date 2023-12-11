const { getAllVendors, addVendor, VendorLogin, getVendorByID, UpdateVendorByID, vendorChangePassword, DeleteVendorByID, getAllVendorNames} = require("../Controllers/Vendor.controller");
const Authentication = require("../Middlewares/Authentication.middleware");
const Authorization = require("../Middlewares/Authorization.middleware");

const VendorRouter = require("express").Router();

VendorRouter.get("/", (req, res) => res.status(200).send({ message: "Welcome to Vendor Route" }));
VendorRouter.post("/register", addVendor);
VendorRouter.post("/login", VendorLogin);

VendorRouter.get("/get-all-vendors", Authentication, Authorization(["Admin", "Vendor"]), getAllVendors);
VendorRouter.get("/get-all-vendor-names", Authentication, Authorization(["Admin", "Vendor"]), getAllVendorNames);
VendorRouter.get("/get-vendor/:id", Authentication, Authorization(["Admin", "Vendor","Employee"]), getVendorByID);

VendorRouter.patch("/update/:id", Authentication, Authorization(["Admin", "Vendor"]), UpdateVendorByID);
VendorRouter.patch("/change-pass/:id", Authentication, Authorization(["Admin", "Vendor"]), vendorChangePassword);

VendorRouter.delete("/delete/:id", Authentication, Authorization(["Admin", "Vendor"]), DeleteVendorByID);

module.exports = VendorRouter;