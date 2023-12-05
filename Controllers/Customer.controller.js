const CustomerModel = require('../Models/Customer.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { getUniqueCustomerCode } = require('../Middlewares/getUniqueCode');
const SendMail = require('../Config/Sendmail');
const { CustomerSignupUser, CustomerSignupAdmin } = require('../Email/CustomerTemplates/CustomerSignup');
const { PasswordChangedEmail } = require('../Email/PasswordChange');
const { CustomerDisableAdmin, CustomerDisableCustomer } = require('../Email/CustomerTemplates/CustomerDisable');
const SetDatesFilter = require('../Config/SetDatesFilter');
require('dotenv').config();

exports.getAllCustomers = async (req, res) => {
    const { filterByDays, status, searchQuery } = req.query;
    let limit = req.query.limit || 50
    let page = req.query.page || 1
    page = page > 0 ? page : 1
    let skip = (page - 1) * limit || 0

  let fromDate = req.query.fromDate || '2023-01-01';
  let toDate = req.query.toDate || '2023-12-31';
  try {
    let query = {};
    if (searchQuery) {
      query = {
        $or: [
          { customer_code: { $regex: new RegExp(searchQuery, 'i') } },
          { first_name: { $regex: new RegExp(searchQuery, 'i') } },
          { last_name: { $regex: new RegExp(searchQuery, 'i') } },
          { email: { $regex: new RegExp(searchQuery, 'i') } }
          // { "phone_number": { $regex: new RegExp(+searchQuery, "i") } },
        ]
      };
    }
    if (filterByDays) {
      let { startDate, endDate } = SetDatesFilter(filterByDays, fromDate, toDate);
      query.createdAt = { $gte: startDate, $lte: endDate };
    }
    const customers = await CustomerModel.find(query).select({ password: 0 }).sort({ createdAt: -1 }).limit(limit).skip(skip);
    const totalCustomers = await CustomerModel.find().count();
    res.status(200).send({ message: 'All Customers', customers, Count: customers.length, totalCustomers });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error?.message || 'Something went Wrong', error });
  }
};

exports.getCustomerSList = async (req, res) => {
  try {
    const customers = await CustomerModel.find().select({ last_name: 1, first_name: 1, customer_code: 1, _id: 1 });
    res.status(200).send({ message: 'Customers list', customers });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error?.message || 'Something went Wrong', error });
  }
};
exports.getCustomerByID = async (req, res) => {
  let id = req?.params?.id;
  try {
    const customer = await CustomerModel.findById(id).select({ password: 0 });
    res.status(200).send({ message: 'Customer By ID', customer });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error?.message || 'Something went Wrong', error });
  }
};

exports.CustomerEmailVerification = async (req, res) => {
  const { email } = req.body;
  try {
    const verify = await CustomerModel.findOne({ email });
    if (!verify) {
      return res.status(404).send({ message: 'Email Not Found, Please check entered email' });
    } else {
      return res.status(200).send({ message: "You're Verified Customer please proceed with password" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: 'Something went wrong', error });
  }
};

exports.CustomerLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(401).json({ message: 'Please provide both email and password. Mandatory fields missing.' });
    }
    const customer = await CustomerModel.findOne({ email });
    if (!customer) {
      return res.status(404).json({ message: 'Email not found. Please check the entered email.' });
    }
    if (customer.status === 'disabled') {
      return res.status(400).json({ message: 'Your account is temporarily disabled by the admin. Please contact us for assistance.' });
    }
    const passwordMatch = await bcrypt.compare(password, customer.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Wrong credentials. Please check your password.' });
    }
    const token = jwt.sign({ _id: customer._id }, process.env.JSON_SECRET);
    if (!token) {
      return res.status(401).json({ message: 'Wrong credentials. Please check your password.' });
    }
    const customerWithoutPassword = { ...customer._doc, password: undefined };

    res.json({ message: 'Login successful', token, customer: customerWithoutPassword });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error?.message || 'Something went Wrong', error });
  }
};

exports.PhoneLogin = async (req, res) => {
  const { phone_number } = req.body;
  try {
    let customer = await CustomerModel.findOne({ phone_number });
    if (!customer) return res.status(404).send({ message: 'Phone Not Found, Please Register' });
    else {
      const token = jwt.sign({ _id: customer?._id, role: customer?.role }, process.env.JSON_SECRET);
      let instance = await CustomerModel.findOne({ phone_number }).select({ password: 0 });
      return res.status(200).send({ message: 'Login Successful', token, customer: instance });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error?.message || 'Something went Wrong', error });
  }
};
exports.addCustomer = async (req, res) => {
  let payload = req.body;
  let temppass = payload.password;
  let { first_name, last_name, email, password } = req.body;
  const test = { first_name, last_name, email, password };

  for (const key in test) {
    if (!test[key]) return res.status(401).json({ message: `Please Provide ${key}, Mandatory field missing: ${key}` });
  }
  try {
    let Customer = await CustomerModel.findOne({ email });
    if (Customer) return res.status(404).send({ message: 'Email Already Registered, Please use different email to signup' });
    const uniqueIdentifier = await getUniqueCustomerCode();
    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) return res.status(500).json({ message: 'Something Went Wrong', Err: 'Bcrypt Error' });
      payload.customer_code = uniqueIdentifier;
      payload.password = hash;
      const customer = new CustomerModel(payload);
      const token = jwt.sign({ _id: customer?._id }, process.env.JSON_SECRET);
      SendMail({ recipientEmail: customer.email, subject: 'Signup Successful!', html: CustomerSignupUser(customer, temppass) });
      SendMail({ recipientEmail: '', subject: 'New Customer Signup ', html: CustomerSignupAdmin(customer) });
      await customer.save();
      return res.status(200).json({ message: 'New Customer Created Successfully', token, customer });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ Error: err || 'Something went Wrong' });
  }
};

exports.ChangePassword = async (req, res) => {
  const id = req?.params?.id;
  let { oldPassword, newPassword } = req.body;
  let temppass = newPassword;

  try {
    if (!oldPassword || !newPassword) {
      return res.status(401).json({ message: 'Please provide both old password and new password. Mandatory fields missing.' });
    }
    const customer = await CustomerModel.findById(id);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    const passwordMatch = await bcrypt.compare(oldPassword, customer.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Wrong old password. Please enter the correct old password.' });
    }
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    await CustomerModel.updateOne({ _id: customer._id }, { password: hashedNewPassword });
    SendMail({ recipientEmail: customer.email, subject: 'Password Changed', html: PasswordChangedEmail('customer', customer, temppass) });
    res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error?.message || 'Something went Wrong', error });
  }
};

exports.UpdateCustomerByID = async (req, res) => {
  let id = req?.params?.id;
  let payload = req.body;
  try {
    const customer = await CustomerModel.findByIdAndUpdate(id, payload);
    if (!customer) {
      res.status(400).send({ message: 'Customer Not Updated' });
    }
    if (payload.updateType == 'statusUpdate' && payload.status == 'disabled') {
      SendMail({ recipientEmail: customer.email, subject: 'Account Temporary Disabled', html: CustomerDisableCustomer(customer) });
      SendMail({ recipientEmail: '', subject: 'Customer Disabled', html: CustomerDisableAdmin(customer) });
    }
    const UpdatedCustomer = await CustomerModel.findById(id);
    res.status(200).send({ message: 'Updated Customer Successfully', customer: UpdatedCustomer });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error?.message || 'Something went Wrong', error });
  }
};
exports.DeleteCustomerByID = async (req, res) => {
  let id = req?.params?.id;
  try {
    const customer = await CustomerModel.findByIdAndDelete(id);
    if (!customer) {
      return res.status(400).send({ message: 'No Customer is there with this id' });
    }
    return res.status(200).send({ message: 'Customer Deleted Successfully' });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error?.message || 'Something went Wrong', error });
  }
};
