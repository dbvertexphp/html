const { getAllTestimonials, getWebsiteData, getAllBanners, UpdateWebsiteData } = require("../Controllers/Website.controller");
const Authentication = require("../Middlewares/Authentication.middleware");
const Authorization = require("../Middlewares/Authorization.middleware");

const WebsiteRouter = require("express").Router();

WebsiteRouter.get("/", (req, res) => res.status(200).send({ message: "Welcome to Website Route" }));
WebsiteRouter.get("/get-all-data", getWebsiteData);
WebsiteRouter.get("/get-all-banners", getAllBanners);
WebsiteRouter.get("/get-all-testimonials", getAllTestimonials);
WebsiteRouter.post("/update-website", Authentication, Authorization(["Admin"]), UpdateWebsiteData);




module.exports = WebsiteRouter;