const SetDatesFilter = require('../Config/SetDatesFilter');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const SendMail = require('../Config/Sendmail');
const { PasswordChangedEmail } = require('../Email/PasswordChange');
const jwt = require('jsonwebtoken');
const { getUniqueEmployeeCode } = require('../Middlewares/getUniqueCode');
const EmployeeModel = require('../Models/EmployeeModel');
require('dotenv').config();

exports.EmployeeLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(401).json({ message: 'Please provide both (email/phone) and password. Mandatory fields missing.' });
    }

    // Check if the email is an email or phone number
    let employee;
    if (isValidEmail(email)) {
      // If the input is a valid email, search based on the email field
      employee = await EmployeeModel.findOne({ email: email });
    } else if (isValidPhoneNumber(email)) {
      // If the input is a valid phone number, search based on the phone_number field
      employee = await EmployeeModel.findOne({ phone_number: email });
    } else {
      // If the input is neither a valid email nor a valid phone number, return an error
      return res.status(400).json({ message: 'Invalid email or phone number format.' });
    }

    if (!employee) {
      return res.status(404).json({ message: 'Please check the entered email or phone number. Not found' });
    }

    // Compare the entered password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, employee.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Wrong credentials. Please check your password.' });
    }

    // Continue with the rest of your existing logic...

    const token = jwt.sign({ _id: employee._id, role: employee.role }, process.env.JSON_SECRET);
    let instance = await EmployeeModel.findOne({ email: employee.email }).select({ password: 0 }).populate('references');

    if (instance.status == 'disabled') {
      return res.status(400).json({
        message: 'Your Account is Temporarily Disabled By Admin. \n Please Contact through Email to review your account'
      });
    }

    return res.status(200).json({ message: 'Login Successful', token, employee: instance });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error?.message || 'Something went wrong', error });
  }
};

// Function to check if the input is a valid email
function isValidEmail(input) {
  const emailRegex = /\S+@\S+\.\S+/;
  return emailRegex.test(input);
}

// Function to check if the input is a valid phone number
function isValidPhoneNumber(input) {
  // You can implement your phone number validation logic here
  // For a simple check, you can use a regular expression or other validation methods
  // Example regex for a simple check: /^[0-9]{10}$/ (assuming 10-digit phone number)
  const phoneRegex = /^[0-9]{10}$/;
  return phoneRegex.test(input);
}

exports.employeeForgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    let vendor = await EmployeeModel.findOne({ email });

    if (!vendor) {
      return res.status(404).json({ message: 'User not found' });
    }
    const new_password = crypto.randomBytes(3).toString('hex');
    const hashedNewPassword = await bcrypt.hash(new_password, 10);

    SendMail({ recipientEmail: email, subject: 'Password Changed', html: PasswordChangedEmail('Employee', vendor, new_password) });
    await EmployeeModel.updateOne({ _id: vendor._id }, { password: hashedNewPassword });
    res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error?.message || 'Something went wrong', error });
  }
};

exports.getAllEmployees = async (req, res) => {
  const { filterByDays, status, searchQuery } = req.query;
  let limit = req.query.limit || 50;
  let page = req.query.page || 1;
  page = page > 0 ? page : 1;
  let skip = (page - 1) * limit || 0;

  let fromDate = req.query.fromDate || '2023-01-01';
  let toDate = req.query.toDate || '2023-12-31';
  try {
    let query = {};
    if (searchQuery) {
      query = {
        $or: [
          { 'address.state': { $regex: new RegExp(searchQuery, 'i') } },
          { 'address.city': { $regex: new RegExp(searchQuery, 'i') } },
          { employee_code: { $regex: new RegExp(searchQuery, 'i') } },
          { employee_name: { $regex: new RegExp(searchQuery, 'i') } },
          { email: { $regex: new RegExp(searchQuery, 'i') } }
        ]
      };
    }
    if (filterByDays) {
      let { startDate, endDate } = SetDatesFilter(filterByDays, fromDate, toDate);
      query.createdAt = { $gte: startDate, $lte: endDate };
    }
    const employees = await EmployeeModel.find(query).sort({ createdAt: -1 }).limit(limit).skip(skip);
    const totalEmployees = await EmployeeModel.find().count();
    return res.status(200).send({ message: 'All Employees', employees, Count: employees.length, totalEmployees });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: 'Something Went Wrong', error });
  }
};

exports.getEmployeeList = async (req, res) => {
  try {
    const employees = await EmployeeModel.find();

    return res.status(200).send({ message: `Employees`, employees });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: 'Something Went Wrong', error });
  }
};
exports.getEmployeeByID = async (req, res) => {
  const id = req?.params?.id;
  try {
    const employee = await EmployeeModel.findById(id).select({ password: 0 });
    if (!employee) {
      return res.status(200).send({ message: 'NO Employee Found with this ID' });
    }
    return res.status(200).send({ message: `Employee with ${id}`, employee });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: 'Something Went Wrong', error });
  }
};

exports.updateEmployeeByID = async (req, res) => {
  const id = req?.params?.id;
  const data = req?.body;
  try {
    const employee = await EmployeeModel.findByIdAndUpdate(id, data);
    if (!employee) {
      return res.status(400).send({ message: 'NO Employee Found with this ID' });
    }
    return res.status(200).send({ message: 'Employee Updated Successfully' });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: 'something went wrong', error });
  }
};

exports.addEmployee = async (req, res) => {
  const payload = req?.body;
  let { email, password, phone_number } = req.body;
  try {
    const employee = await EmployeeModel.findOne({ email: payload.email });
    if (employee) {
      return res.status(400).send({ message: 'Email Already Registered, Please use different email to signup' });
    }
    const uniqueIdentifier = await getUniqueEmployeeCode();
    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) return res.status(500).json({ message: 'Something Went Wrong', Err: 'Bcrypt Error' });
      payload.password = hash;
      payload.employee_code = uniqueIdentifier;
      const newEmployee = new EmployeeModel(payload);
      await newEmployee.save();
      return res.status(200).send({ message: 'Employee Created Successfully', employee: newEmployee });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: 'something went wrong', error });
  }
};

exports.deleteEmployeeByID = async (req, res) => {
  let id = req?.params?.id;
  try {
    const employee = await EmployeeModel.findByIdAndDelete(id);
    if (!employee) {
      return res.status(400).send({ message: 'NO User Found with this id' });
    }
    return res.status(200).send({ message: 'Employee Deleted Successfully' });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error?.message || 'Something went Wrong', error });
  }
};
exports.employeeChangePassword = async (req, res) => {
  const id = req?.params?.id;
  let { newPass: newPassword } = req.body;
  let temppass = newPassword;

  try {
    if (!newPassword) {
      return res.status(401).json({ message: 'Please provide both old password and new password. Mandatory fields missing.' });
    }
    const employee = await EmployeeModel.findById(id);
    if (!employee) {
      return res.status(404).json({ message: 'vendor not found' });
    }
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    SendMail({ recipientEmail: employee.email, subject: 'Password Changed', html: PasswordChangedEmail('vendor', employee, temppass) });
    await EmployeeModel.updateOne({ _id: employee._id }, { password: hashedNewPassword });
    res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error?.message || 'Something went wrong', error });
  }
};
