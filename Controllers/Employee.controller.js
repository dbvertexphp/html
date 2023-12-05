const SetDatesFilter = require("../Config/SetDatesFilter");
const { getUniqueEmployeeCode } = require("../Middlewares/getUniqueCode");
const EmployeeModel = require("../Models/EmployeeModel")


exports.getAllEmployees = async (req, res) => {
    const { filterByDays, status, searchQuery } = req.query;
    let limit = req.query.limit || 50
    let page = req.query.page || 1
    page = page > 0 ? page : 1
    let skip = (page - 1) * limit || 0

    let fromDate = req.query.fromDate || "2023-01-01";
    let toDate = req.query.toDate || "2023-12-31";
    try {
        let query = {};
        if (searchQuery) {
            query = {
                $or: [
                    { "address.state": { $regex: new RegExp(searchQuery, "i") } },
                    { "address.city": { $regex: new RegExp(searchQuery, "i") } },
                    { "employee_code": { $regex: new RegExp(searchQuery, "i") } },
                    { "employee_name": { $regex: new RegExp(searchQuery, "i") } },
                    { "email": { $regex: new RegExp(searchQuery, "i") } },
                ],
            }
        } if (filterByDays) {
            let { startDate, endDate } = SetDatesFilter(filterByDays, fromDate, toDate);
            query.createdAt = { $gte: startDate, $lte: endDate };
        }
        const employees = await EmployeeModel.find(query).sort({ createdAt: -1 }).limit(limit).skip(skip);
        const totalEmployees = await EmployeeModel.find().count()
        return res.status(200).send({ message: "All Employees", employees, Count: employees.length, totalEmployees });
    } catch (error) {
        console.log(error)
        return res.status(400).send({ message: "Something Went Wrong", error });

    }
}

exports.getEmployeeList = async (req, res) => {

    try {
        const employees = await EmployeeModel.find()

        return res.status(200).send({ message: `Employees`, employees });
    } catch (error) {
        console.log(error)
        return res.status(400).send({ message: "Something Went Wrong", error });
    }
}
exports.getEmployeeByID = async (req, res) => {
    const id = req?.params?.id;
    try {
        const employee = await EmployeeModel.findById(id).select({ password: 0 });
        if (!employee) {
            return res.status(200).send({ message: "NO Employee Found with this ID" });
        }
        return res.status(200).send({ message: `Employee with ${id}`, employee });
    } catch (error) {
        console.log(error)
        return res.status(400).send({ message: "Something Went Wrong", error });
    }
}

exports.updateEmployeeByID = async (req, res) => {
    const id = req?.params?.id;
    const data = req?.body;
    try {
        const employee = await EmployeeModel.findByIdAndUpdate(id, data);
        if (!employee) {
            return res.status(400).send({ message: "NO Employee Found with this ID" })
        }
        return res.status(200).send({ message: "Employee Updated Successfully" });
    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: "something went wrong", error })
    }
}

exports.addEmployee = async (req, res) => {
    const payload = req?.body;
    try {
        const employee = await EmployeeModel.findOne({ email: payload.email });
        if (employee) {
            return res.status(400).send({ message: "Email Already Registered, Please use different email to signup" });
        }
        const uniqueIdentifier = await getUniqueEmployeeCode();
        payload.employee_code = uniqueIdentifier;
        const newEmployee = new EmployeeModel(payload);
        await newEmployee.save();
        return res.status(200).send({ message: "Employee Created Successfully", employee: newEmployee });
    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: "something went wrong", error });
    }
}

exports.deleteEmployeeByID = async (req, res) => {
    let id = req?.params?.id
    try {
        const employee = await EmployeeModel.findByIdAndDelete(id)
        if (!employee) {
            return res.status(400).send({ message: "NO User Found with this id" })
        }
        return res.status(200).send({ message: "Employee Deleted Successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: error?.message || "Something went Wrong", error });
    }
};