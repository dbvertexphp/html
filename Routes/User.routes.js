const { getAllUsers, addUser, AuthLogin, editUser } = require("../Controllers/User.controller");
const Authentication = require("../Middlewares/Authentication.middleware");
const Authorization = require("../Middlewares/Authorization.middleware");

const UserRouter = require("express").Router();

UserRouter.get("/", (req, res) => res.status(200).send({ message: "Welcome to User Route" }));

UserRouter.get("/get-all-users", getAllUsers);

UserRouter.post("/register", addUser);
UserRouter.post("/admin-login", AuthLogin);

UserRouter.patch("/editUser/:id", Authentication, Authorization(["Admin"]), editUser);


module.exports = UserRouter;