const { getAllTransactions, getTransactionsByUserID, getTransactionsByVendorID } = require("../Controllers/Transaction.controller");
const Authentication = require("../Middlewares/Authentication.middleware");
const Authorization = require("../Middlewares/Authorization.middleware");

const TransactionRouter = require("express").Router();

TransactionRouter.get("/", Authentication, (req, res) => res.status(200).send({ message: "Welcome to Car Route" }));
TransactionRouter.get("/get-all-transactions", Authentication, Authorization(["Admin"]), getAllTransactions);
TransactionRouter.get("/get-transactions-by-userid/:id", Authentication, getTransactionsByUserID);
TransactionRouter.get("/get-transactions-by-vendorid/:id", Authentication, getTransactionsByVendorID);

module.exports = TransactionRouter;