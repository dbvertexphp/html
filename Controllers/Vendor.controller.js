const VendorModel = require("../Models/Vendor.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { getUniqueVendorCode } = require("../Middlewares/getUniqueCode");
const SendMail = require("../Config/Sendmail");
const { PasswordChangedEmail } = require("../Email/PasswordChange");
const { VendorDisable, VendorDisableAdmin } = require("../Email/VendorTemplates/VendorDisable");
const { VendorApproval } = require("../Email/VendorTemplates/VendorApproval");
const { VendorAdded, VendorAddedAdmin } = require("../Email/VendorTemplates/VendorAdd");
const SetDatesFilter = require("../Config/SetDatesFilter");
require("dotenv").config();

exports.getAllVendors = async (req, res) => {
    const { filterByDays, vendor, searchQuery } = req.query;
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
                    { "vendor_code": { $regex: new RegExp(searchQuery, "i") } },
                    { "vendor_name": { $regex: new RegExp(searchQuery, "i") } },
                    { "email": { $regex: new RegExp(searchQuery, "i") } },
                ],
            }
        }
        if (filterByDays) {
            let { startDate, endDate } = SetDatesFilter(filterByDays, fromDate, toDate)
            query.createdAt = { $gte: startDate, $lte: endDate };
        }

        const Vendors = await VendorModel.find(query).select({ password: 0 }).limit(limit).skip(skip).populate("reference").sort({ created_at: -1 });
        const totalVendors = await VendorModel.find().count()
        return res.status(200).send({ message: "All Vendors", Vendors, Count: Vendors.length, totalVendors });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: error?.message || "Something went Wrong", error });
    }
};
exports.getAllVendorNames = async (req, res) => {
    let id = req?.params?.id
    try {
        const Vendors = await VendorModel.find().select({ _id: 1, vendor_name: 1, vendor_code: 1 })
        return res.status(200).send({ message: "Vendors", Vendors, totalVendors: Vendors.length });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: error?.message || "Something went Wrong", error });
    }
};
exports.getVendorByID = async (req, res) => {
    let id = req?.params?.id
    try {
        const Vendor = await VendorModel.findById(id).populate("reference").select({ password: 0 })
        return res.status(200).send({ message: "Vendor By ID", Vendor });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: error?.message || "Something went Wrong", error });
    }
};
exports.VendorLogin = async (req, res) => {
    const { email, password } = req.body;
    const test = { email, password }
    for (const key in test) {
        if (!test[key]) return res.status(401).json({ message: `Please Provide ${key}, Mandatory field missing: ${key}` })
    }
    try {
        let vendor = await VendorModel.findOne({ email })
        if (!vendor) return res.status(404).send({ message: "Email Not Found, Please check entered email" });
        bcrypt.compare(password, vendor?.password).then(async (result) => {
            if (!result) {
                return res.status(404).send({ message: "Wrong Credentials" });
            } else {
                const token = jwt.sign({ _id: vendor?._id }, process.env.JSON_SECRET);
                let instance = await VendorModel.findOne({ email }).select({ password: 0 }).populate("reference")
                if (instance.status == "disabled") return res.status(400).json({ message: "Your Account is Temporarily Disabled By Admin. \n Please Contact through Email to review your account" });
                return res.status(200).send({ message: "Login Successful", token, vendor: instance });
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: error?.message || "Something went Wrong", error });
    }
};
exports.addVendor = async (req, res) => {
    let payload = req.body
    let { email, password, vendor_name, company_name, phone_number } = req.body
    const test = { email, password, vendor_name, company_name, phone_number: +phone_number }

    const isExist = await VendorModel.findOne({ email: email });
    if (isExist) {
        return res.status(500).json({ message: "Email Already Registered, Please use different email to signup" });
    }

    for (const key in test) {
        if (!test[key]) return res.status(401).json({ message: `Please Provide ${key}, Mandatory field missing: ${key}` })
    }
    try {
        const uniqueIdentifier = await getUniqueVendorCode();
        bcrypt.hash(password, 10, async (err, hash) => {
            if (err) return res.status(500).json({ message: "Something Went Wrong", Err: "Bcrypt Error" })
            payload.password = hash
            payload.vendor_code = uniqueIdentifier;
            const instance = new VendorModel(payload)

            SendMail({ recipientEmail: instance.email, subject: "Account Created", html: VendorAdded(instance) })
            SendMail({ recipientEmail: "", subject: "New Vendor Added", html: VendorAddedAdmin(instance) })

            await instance.save()
            return res.status(200).json({ message: "New Vendor Created Successfully", instance });
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error?.message || "Something went Wrong", error })
    }
}
exports.vendorChangePassword = async (req, res) => {

    const id = req?.params?.id
    let { providedPass: oldPassword, newPass: newPassword } = req.body
    let temppass = newPassword

    try {
        if (!oldPassword || !newPassword) {
            return res.status(401).json({ message: "Please provide both old password and new password. Mandatory fields missing." });
        }
        const vendor = await VendorModel.findById(id);
        if (!vendor) {
            return res.status(404).json({ message: "vendor not found" });
        }
        const passwordMatch = await bcrypt.compare(oldPassword, vendor.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: "Old Password is incorrect. Please enter the correct old password." });
        }
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        SendMail({ recipientEmail: vendor.email, subject: "Password Changed", html: PasswordChangedEmail("vendor", vendor, temppass) })
        await VendorModel.updateOne({ _id: vendor._id }, { password: hashedNewPassword });
        res.status(200).json({ message: "Password changed successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error?.message || "Something went wrong", error });
    }
};
exports.UpdateVendorByID = async (req, res) => {
    let id = req?.params?.id
    let payload = req.body
    try {
        let vendor = await VendorModel.findById(id)
        if (!vendor) return res.status(400).json({ message: "Vendor Not Found" })
        if (payload?.status == "disabled" && payload.updatetype == "statusUpdate") {
            SendMail({ recipientEmail: vendor.email, subject: "Temporary Disabled", html: VendorDisable(vendor) })
            SendMail({ recipientEmail: "", subject: "Vendor Temporary Disabled", html: VendorDisableAdmin(vendor) })
        } else if (payload?.status == "active" && payload.updatetype == "statusUpdate") {
            SendMail({ recipientEmail: vendor.email, subject: "Approved as Vendor", html: VendorApproval(vendor) })
        }
        await VendorModel.findByIdAndUpdate(id, payload)
        const UpdatedVendor = await VendorModel.findById(id)
        return res.status(200).send({ message: "Updated Vendor Successfully", UpdatedVendor });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: error?.message || "Something went Wrong", error });
    }
};
exports.DeleteVendorByID = async (req, res) => {
    let id = req?.params?.id
    try {
        await VendorModel.findByIdAndDelete(id)
        return res.status(200).send({ message: "Vendor Deleted Successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: error?.message || "Something went Wrong", error });
    }
};