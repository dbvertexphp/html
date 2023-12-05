const SendMail = require("../Config/Sendmail");
const SetDatesFilter = require("../Config/SetDatesFilter");
const { TestDriveApproveUser } = require("../Email/TestDriveTemplates/TestDriveApproveUser");
const { TestDriveBookingAdmin } = require("../Email/TestDriveTemplates/TestDriveBookingAdmin");
const TestDriveModel = require("../Models/TestDrive.model");
const TransactionModel = require("../Models/Transaction.model");
const { PhonepePaymentInitiater } = require("./PhonePe.controller");

exports.getAllTestDrives = async (req, res) => {

    const { filterByDays, status, search } = req.query;
    let limit = req.query.limit || 50
    let page = req.query.page || 1
    page = page > 0 ? page : 1
    let skip = (page - 1) * limit || 0

    let fromDate = req.query.fromDate || "2023-01-01";
    let toDate = req.query.toDate || "2023-12-31";
    try {
        let query = {};
        if (search) {
            query.name = { $regex: search, $options: "i" }
        }
        if (filterByDays) {
            let { startDate, endDate } = SetDatesFilter(filterByDays, fromDate, toDate);
            query.createdAt = { $gte: startDate, $lte: endDate };
        }

        const testDrives = await TestDriveModel.find(query).sort({ createdAt: -1 }).limit(limit).skip(skip)
            .populate(["name", "vendor_id", "customer_id"]).populate({
                path: 'car_id', populate: [
                    { path: 'name', model: 'CarNameModel', },
                    { path: 'make', model: 'Brand' },
                    { path: 'model', model: 'CarModel' },
                ]
            }).populate({
                path: 'vendor_id',
                populate: [{
                    path: 'reference', model: 'employees',
                }
                ]
            });
        const totalTestDrives = await TestDriveModel.find().count()
        return res.status(200).send({ message: "All TestDrives", testDrives, Count: testDrives.length, totalTestDrives });
    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: error?.message || "Something went wrong", error })

    }
}

exports.getAllTestDrivesByVendorID = async (req, res) => {
    const { id } = req.params;
    const { filterByDays, status } = req.query;
    let limit = req.query.limit || 10
    let page = req.query.page || 1
    page = page > 0 ? page : 1
    let skip = (page - 1) * limit || 0

    let fromDate = req.query.fromDate || "2023-01-01";
    let toDate = req.query.toDate || "2023-12-31";
    try {
        let query = { vendor_id: id };
        if (filterByDays) {
            let { startDate, endDate } = SetDatesFilter(filterByDays, fromDate, toDate);
            query.createdAt = { $gte: startDate, $lte: endDate };
        }
        const testDrives = await TestDriveModel.find(query).sort({ createdAt: -1 }).limit(limit).skip(skip)
            .populate(["name", "vendor_id", "customer_id"]).populate({
                path: 'car_id', populate: [
                    { path: 'name', model: 'CarNameModel', },
                    { path: 'make', model: 'Brand' },
                    { path: 'model', model: 'CarModel' },
                ]
            }).populate({
                path: 'vendor_id',
                populate: [{
                    path: 'reference', model: 'employees',
                }
                ]
            });
        const totalTestDrives = await TestDriveModel.find().count()
        return res.status(200).send({ message: "All TestDrives", testDrives, Count: testDrives.length, totalTestDrives });
    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: error?.message || "Something went wrong", error })

    }
}

exports.getAllTestDrivesOnlyCarID = async (req, res) => {

    try {
        const testDrives = await TestDriveModel.find().select("car_id status _id").sort({ createdAt: -1 })
        const totalTestDrives = await TestDriveModel.find().count()
        return res.status(200).send({ message: "All TestDrives CarID", testDrives, totalTestDrives });
    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: error?.message || "Something went wrong", error })

    }
}

exports.getTestDriveByID = async (req, res) => {
    const id = req?.params?.id;
    try {
        const testDrive = await TestDriveModel.findById(id).populate(["name", "vendor_id", "customer_id"]).populate({
            path: 'car_id',
            populate: [{
                path: 'name',
                model: 'CarNameModel',
            }, {
                path: 'make',
                model: 'Brand',
            }, {
                path: 'model',
                model: 'CarModel',
            },
            ]
        });;
        if (!testDrive) {
            return res.status(401).send({ message: "NO Test Drive Found with this ID" });
        }
        return res.status(200).send({ message: `Test Drive with ${id}`, testDrive });
    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: error?.message || "Something went wrong", error })
    }
}
exports.getTestDriveByOfUser = async (req, res) => {
    const id = req?.params?.id;

    try {
        const testDrives = await TestDriveModel.find({ customer_id: id }).populate(["name", "vendor_id", "customer_id"]).populate({
            path: 'car_id',
            populate: [{
                path: 'name',
                model: 'CarNameModel',
            }, {
                path: 'make',
                model: 'Brand',
            }, {
                path: 'model',
                model: 'CarModel',
            },
            ]
        });;

        return res.status(200).send({ message: `Test Drive with ${id}`, testDrives });
    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: error?.message || "Something went wrong", error })
    }
}
exports.getTestDriveByOfCar = async (req, res) => {
    const id = req?.params?.id;
    try {
        const testDrives = await TestDriveModel.find({ car_id: id }).populate(["name", "vendor_id", "customer_id"]).populate({
            path: 'car_id', populate: [
                { path: 'name', model: 'CarNameModel', },
                { path: 'make', model: 'Brand' },
                { path: 'model', model: 'CarModel' },
            ]
        }).populate({
            path: 'vendor_id',
            populate: [{
                path: 'reference', model: 'employees',
            }
            ]
        });

        return res.status(200).send({ message: `Test Drive with ${id}`, testDrives });
    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: error?.message || "Something went wrong", error })
    }
}

exports.updateTestDriveByID = async (req, res) => {
    const id = req?.params?.id;
    const data = req?.body;
    try {
        let oneTDrive = await TestDriveModel.findOne({ _id: id }).populate("customer_id");
        if (!oneTDrive) {
            return res.status(500).send({ message: "No Test Drive Found with this ID" })
        }
        if (data.status == "approved") {
            const AllTDrives = await TestDriveModel.find({ car_id: oneTDrive.car_id })
            for (const TD of AllTDrives) {
                if (TD.status == "approved") return res.status(500).send({
                    message: "Another Test Drive is already been approved, to approve this Test Drive, First Change Status of the approved test Drive"
                })
            }
            // SendMail({ recipientEmail: oneTDrive.customer_id.email, subject: "Test Drive Status Changed", html: TestDriveApproveUser({ TestDrive: oneTDrive }) })
            await TestDriveModel.findByIdAndUpdate(id, data);
            return res.status(200).send({ message: "Test Drive Updated Successfully" });
        } else {
            await TestDriveModel.findByIdAndUpdate(id, data);
            return res.status(200).send({ message: "Test Drive Updated Successfully" });
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: error.message || "Something went wrong", error })
    }
}

exports.addTestDrive = async (req, res) => {
    let payload = req?.body;


    payload = {
        ...payload,
        vendor_id: (payload?.vendor_id).toString(),
        car_id: (payload?.car_id).toString(),
        customer_id: (payload?.customer_id).toString(),
    }

    try {
        const newTD = new TestDriveModel(payload);
        const UsertestDrives = await TestDriveModel.find({ email: newTD.email })
        const CartestDrives = await TestDriveModel.find({ car_id: newTD.car_id })
        for (const TD of UsertestDrives) {
            if (TD && TD.email == newTD.email && (TD.car_id).toString() == (newTD.car_id).toString()) {
                return res.status(500).send({
                    message: "You have already booked one Test drive for this car, You cannot book another test drive for the same car."
                });
            }
        }
        for (const TD of CartestDrives) {
            if (TD && (TD.car_id).toString() == (newTD.car_id).toString()
                && TD.test_drive_slot == newTD.test_drive_slot
                && TD.test_drive_date == newTD.test_drive_date) {
                return res.status(500).send({ message: "Another person had already booked a test drive for this slot" });
            }
        }

        let newTransaction = {
            customer_name: payload.customer_name,
            customer_id: payload.customer_id,
            test_drive_id: newTD._id,
            car_id: payload.car_id,
            reference_id: "string",
            status: "PAYMENT_ERROR",
            newTransaction: "testdrive",
            amount_to_pay: payload.amount_to_pay,
            transaction_type: "Test Drive Booking"
        }


        const transaction = new TransactionModel(newTransaction)
        await transaction.save()

        let params = new URLSearchParams(payload)
        await PhonepePaymentInitiater(req, res, transaction?._id, payload.customer_id, payload.amount_to_pay, params)
    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: error.message || "Something went wrong", error })
    }
}

exports.deleteTestDriveByID = async (req, res) => {
    let id = req?.params?.id
    try {
        const testDrive = await TestDriveModel.findByIdAndDelete(id)
        if (!testDrive) {
            return res.status(401).send({ message: "NO Test Drive Found with this id" })
        }
        return res.status(200).send({ message: "Test Drive Deleted Successfully" });
    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: error.message || "Something went wrong", error })
    }
};