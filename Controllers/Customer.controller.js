const CustomerModel = require('../Models/Customer.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { getUniqueCustomerCode } = require('../Middlewares/getUniqueCode');
const SendMail = require('../Config/Sendmail');
const { CustomerSignupUser, CustomerSignupAdmin } = require('../Email/CustomerTemplates/CustomerSignup');
const { OtpTemplapes } = require('../Email//OtpTemplates/OtpTemplapes');
const { PasswordChangedEmail } = require('../Email/PasswordChange');
const { CustomerDisableAdmin, CustomerDisableCustomer } = require('../Email/CustomerTemplates/CustomerDisable');
const SetDatesFilter = require('../Config/SetDatesFilter');
require('dotenv').config();

exports.getAllCustomers = async (req, res) => {
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
      return res.status(401).json({ message: 'Please provide both identifier (email/phone) and password. Mandatory fields missing.' });
    }

    let customer;
    if (isValidEmail(email)) {
      // If the input is a valid email, search based on the email field
      customer = await CustomerModel.findOne({ email: email });
    } else if (isValidPhoneNumber(email)) {
      // If the input is a valid phone number, search based on the phone_number field
      customer = await CustomerModel.findOne({ phone_number: email });
    } else {
      // If the input is neither a valid email nor a valid phone number, return an error
      return res.status(400).json({ message: 'Invalid email or phone number format.' });
    }

    if (!customer) {
      return res.status(404).json({ message: 'Please check the entered email or phone number. Not found' });
    }

    if (!customer.otp_verified && isValidPhoneNumber(email)) {
      const otp = generateOTP();
      phone_number = await CustomerModel.findOne({ phone_number: email });
      const emails = phone_number.email;
      // Update customer with the new OTP
      customer = await CustomerModel.findOneAndUpdate({ email: emails }, { $set: { otp } }, { new: true });

      // Send OTP verification email
      SendMail({
        recipientEmail: emails,
        subject: 'Verify Your OTP!',
        html: OtpTemplapes(customer)
      });
    }
    if (!customer.otp_verified && isValidEmail(email)) {
      const otp = generateOTP();
      phone_number = await CustomerModel.findOne({ email: email });
      const emails = phone_number.email;
      // Update customer with the new OTP
      customer = await CustomerModel.findOneAndUpdate({ email: emails }, { $set: { otp } }, { new: true });

      // Send OTP verification email
      SendMail({
        recipientEmail: emails,
        subject: 'Verify Your OTP!',
        html: OtpTemplapes(customer)
      });
    }

    // Compare the entered password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, customer.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Wrong credentials. Please check your password.' });
    }

    // Continue with the rest of your existing logic...

    const token = jwt.sign({ _id: customer._id }, process.env.JSON_SECRET);

    if (!token) {
      return res.status(401).json({ message: 'Wrong credentials. Please check your password.' });
    }

    const customerWithoutPassword = { ...customer._doc, password: undefined };

    res.json({ message: 'Login successful', token, customer: customerWithoutPassword });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error?.message || 'Something went wrong', error });
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
    if (Customer)
      return res.status(404).send({
        message: 'Email Already Registered, Please use a different email to sign up'
      });

    const uniqueIdentifier = await getUniqueCustomerCode();

    // Generate OTP
    const otp = generateOTP();

    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) return res.status(500).json({ message: 'Something Went Wrong', Err: 'Bcrypt Error' });

      payload.customer_code = uniqueIdentifier;
      payload.password = hash;
      payload.otp = otp; // Add OTP to the payload
      payload.otp_verified = false; // Set otp_verified to false by default

      const customer = new CustomerModel(payload);
      //const token = jwt.sign({ _id: customer?._id }, process.env.JSON_SECRET);
      const token = '';
      // Send OTP verification email
      SendMail({
        recipientEmail: customer.email,
        subject: 'Verify Your OTP!',
        html: OtpTemplapes(customer)
      });

      // Send other emails (removed sensitive information)
      // SendMail({
      //   recipientEmail: customer.email,
      //   subject: 'Signup Successful!',
      //   html: CustomerSignupUser(customer, temppass)
      // });
      // SendMail({
      //   recipientEmail: '',
      //   subject: 'New Customer Signup ',
      //   html: CustomerSignupAdmin(customer)
      // });

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
  let { newPassword } = req.body;
  let temppass = newPassword;

  try {
    const customer = await CustomerModel.findById(id);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
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
exports.Otp_verified = async (req, res) => {
  try {
    const { email, otp } = req.body;

    let user;

    if (isValidEmail(email)) {
      // If the input is a valid email, search based on the email field
      user = await CustomerModel.findOne({ email: email });
    } else if (isValidPhoneNumber(email)) {
      // If the input is a valid phone number, search based on the phone_number field
      user = await CustomerModel.findOne({ phone_number: email });
    } else {
      // If the input is neither a valid email nor a valid phone number, return an error
      return res.status(400).json({ message: 'Invalid email or phone number format.' });
    }

    // Find the user by email/phone and OTP
    const userByOtp = await CustomerModel.findOne({ _id: user?._id, otp, otp_verified: false });

    if (userByOtp) {
      // If user found, update otp_verified to true
      await CustomerModel.updateOne({ _id: userByOtp._id, otp }, { $set: { otp_verified: true } });

      const token = jwt.sign({ _id: userByOtp?._id }, process.env.JSON_SECRET);

      // Include required data and token in the response
      return res.status(200).json({
        status: true,
        message: 'OTP verified successfully',
        customer: {
          _id: userByOtp._id,
          customer_code: userByOtp.customer_code,
          email: userByOtp.email,
          role: userByOtp.role,
          first_name: userByOtp.first_name,
          last_name: userByOtp.last_name,
          createdAt: userByOtp.createdAt,
          otp: userByOtp.otp,
          otp_verified: true,
          status: userByOtp.status,
          orders: userByOtp.orders,
          createdAt: userByOtp.createdAt,
          updatedAt: userByOtp.updatedAt,
          __v: userByOtp.__v
        },
        token
      });
    } else {
      return res.status(400).json({ status: false, message: 'Invalid OTP' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: false, message: 'Something went wrong' });
  }
};

exports.ResendOtp = async (req, res) => {
  const { email } = req.body;

  try {
    if (!email) {
      return res.status(400).json({ message: 'Please provide an email address or phone number.' });
    }

    let customer, contactField;

    if (isValidEmail(email)) {
      // If the input is a valid email, search based on the email field
      customer = await CustomerModel.findOne({ email });
      contactField = 'email';
    } else if (isValidPhoneNumber(email)) {
      // If the input is a valid phone number, search based on the phone_number field
      customer = await CustomerModel.findOne({ phone_number: email });
      contactField = 'phone_number';
    } else {
      // If the input is neither a valid email nor a valid phone number, return an error
      return res.status(400).json({ message: 'Invalid email or phone number format.' });
    }

    if (!customer) {
      return res.status(404).json({ message: 'Contact not found.' });
    }

    if (customer.status === 'disabled') {
      return res.status(400).json({ message: 'Your account is temporarily disabled by the admin. Please contact us for assistance.' });
    }

    // Generate a new OTP
    const otp = generateOTP();

    // Update customer with the new OTP
    customer = await CustomerModel.findOneAndUpdate({ [contactField]: email }, { $set: { otp } }, { new: true });

    // Send OTP verification message based on the contact field
    const recipientContact = contactField === 'email' ? customer.email : customer.phone_number;
    console.log(customer);

    SendMail({
      recipientEmail: customer.email,
      subject: 'Verify Your OTP!',
      html: OtpTemplapes(customer)
    });

    return res.status(200).json({
      message: `OTP resent successfully. Please check your ${contactField === 'email' ? 'email' : 'phone'} for the new OTP.`,
      customer: { _id: customer._id, [contactField]: recipientContact, otp_verified: customer.otp_verified }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error?.message || 'Something went wrong', error });
  }
};

exports.forgetPassword = async (req, res) => {
  const { email, otp, password } = req.body;

  try {
    // Find the user by email
    const customer = await CustomerModel.findOne({ email });

    // Check if the user exists
    if (!customer) {
      return res.status(404).json({ message: 'User not found with this email' });
    }

    // Check if the provided OTP matches the stored OTP
    if (customer.otp !== otp || !customer.otp_verified) {
      return res.status(401).json({ message: 'Invalid OTP' });
    }

    // Hash the new password
    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) {
        return res.status(500).json({ message: 'Something Went Wrong', error: 'Bcrypt Error' });
      }

      // Update the user's password and set otp_verified to true
      customer.password = hash;
      customer.otp_verified = true;

      // Save the updated user
      await customer.save();

      return res.status(200).json({ message: 'Password updated successfully' });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Something went wrong', error });
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

function isValidEmail(input) {
  // You can implement your email validation logic here
  // For a simple check, you can use a regular expression
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

const generateOTP = () => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};
