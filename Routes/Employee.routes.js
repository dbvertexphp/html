const { Router } = require("express");
const { getAllEmployees, getEmployeeByID,EmployeeLogin, addEmployee, updateEmployeeByID, deleteEmployeeByID, getEmployeeList ,employeeChangePassword} = require("../Controllers/Employee.controller");
const Authentication = require("../Middlewares/Authentication.middleware");
const Authorization = require("../Middlewares/Authorization.middleware");

const EmployeeRouter = Router();

EmployeeRouter.get("/", (req, res) => res.status(200).send("Welcome to Employee Route"));
EmployeeRouter.post("/login", EmployeeLogin);
EmployeeRouter.get("/get-all-employees-list", getEmployeeList);
EmployeeRouter.get("/get-all-employees", Authentication, Authorization(["Admin", "Vendor"]), getAllEmployees);
EmployeeRouter.get("/get-employee/:id", Authentication, Authorization(["Admin", "Vendor"]), getEmployeeByID);

EmployeeRouter.post("/add-employee", Authentication, Authorization(["Admin"]), addEmployee);

EmployeeRouter.patch("/update/:id", Authentication, Authorization(["Admin"]), updateEmployeeByID);

EmployeeRouter.delete("/delete/:id", Authentication, Authorization(["Admin"]), deleteEmployeeByID);
EmployeeRouter.patch("/change-pass/:id", Authentication, Authorization(["Admin", "Employee"]), employeeChangePassword);

module.exports = EmployeeRouter;