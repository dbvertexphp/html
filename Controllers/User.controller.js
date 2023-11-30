const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserModel = require("../Models/User.model");
require("dotenv").config();

exports.AuthLogin = async (req, res) => {
    const { email, password } = req.body;
    const test = { email, password }
    for (const key in test) {
        if (!test[key]) return res.status(401).json({ message: `Please Provide ${key}, Mandatory field missing: ${key}` })
    }
    try {
        let user = await UserModel.findOne({ email })
        if (!user) return res.status(404).send({ message: "Email Not Found, Please check entered email" });
        bcrypt.compare(password, user?.password).then(async (result) => {
            if (!result) {
                return res.status(404).send({ message: "Wrong Credentials" });
            } else {
                const token = jwt.sign({ _id: user?._id, role: user?.role }, process.env.JSON_SECRET);
                let instance = await UserModel.findOne({ email }).select({ password: 0 })
                return res.status(200).send({ message: "Login Successful", token, user: instance });
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: error?.message || "Something went Wrong", error });
    }
};

exports.getAllUsers = async (req, res) => {
    let limit = req.query.limit || 10
    let page = req.query.page || 1
    page = page > 0 ? page : 1
    let skip = (page - 1) * limit || 0
    try {
        const Users = await UserModel.find().select({ password: 0 }).limit(limit).skip(skip)
        const totalUsers = await UserModel.find().count()
        return res.status(200).send({ message: "All Users", Users, Count: Users.length, totalUsers });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: error?.message || "Something went Wrong", error });
    }
};
exports.addUser = async (req, res) => {
    let payload = req.body
    let { email, password, first_name, last_name, phone_number } = req.body
    const test = { email, password, first_name, last_name, phone_number: +phone_number }

    for (const key in test) {
        if (!test[key]) return res.status(401).json({ message: `Please Provide ${key}, Mandatory field missing: ${key}` })
    }
    try {
        bcrypt.hash(password, 10, async (err, hash) => {
            if (err) return res.status(500).json({ message: "Something Went Wrong", Err: "Bcrypt Error" })
            payload.password = hash
            const instance = new UserModel(payload)
            await instance.save()
            return res.status(200).json({ message: "New User Created Successfully", instance });
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: error?.message || "Something went wrong", error })
    }
}
exports.editUser = async (req, res) => {
    let payload = req.body
    let id = req.params.id
    try {
        await UserModel.findByIdAndUpdate(id, payload)
        let Updated = await UserModel.findById(id).select({ password: 0 })
        return res.status(200).json({ message: "Edited User Successfully", Updated });
    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: error?.message || "Something went wrong", error })
    }
}
