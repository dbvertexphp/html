const SetDatesFilter = require('../Config/SetDatesFilter');
const TransactionModel = require('../Models/Transaction.model');
let populateArr = ['car_id', 'test_drive_id', 'customer_id'];
let populateObj = {
  path: 'car_id',
  populate: [
    { path: 'name', model: 'CarNameModel' },
    { path: 'make', model: 'Brand' },
    { path: 'model', model: 'CarModel' }
  ]
};

exports.getAllTransactions = async (req, res) => {
  const { filterByDays, status, searchQuery } = req.query;
  let limit = req.query.limit || 50;
  let page = req.query.page || 1;
  page = page > 0 ? page : 1;
  let skip = (page - 1) * limit || 0;

  let fromDate = req.query.fromDate || '2023-01-01';
  let toDate = req.query.toDate || '2023-12-31';
  try {
    let query = {};

    if (searchQuery) query = { customer_name: { $regex: new RegExp(searchQuery, 'i') } };
    if (status) query.status = status;

    if (filterByDays) {
      let { startDate, endDate } = SetDatesFilter(filterByDays, fromDate, toDate);
      query.createdAt = { $gte: startDate, $lte: endDate };
    }

    const transactions = await TransactionModel.find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip)
      .populate(['car_id', 'test_drive_id', 'customer_id', 'car_id.vendorID'])
      .populate(populateObj)
      .exec();

    const totaltransactions = await TransactionModel.find().count();
    return res.status(200).send({ message: 'All transactions', transactions, Count: transactions.length, totaltransactions });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: 'Something Went Wrong', error });
  }
};

exports.getTransactionsByUserID = async (req, res) => {
  const id = req?.params?.id;
  try {
    const transactions = await TransactionModel.find({ customer_id: id }).sort({ createdAt: -1 }).populate(populateArr).populate(populateObj);
    if (!transactions.length) {
      return res.status(401).send({ message: 'No Transaction Found with this ID' });
    }
    return res.status(200).send({ message: `Transactions with User ID ${id}`, transactions });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error?.message || 'Something went wrong', error });
  }
};
exports.getTransactionsByVendorID = async (req, res) => {
  const id = req?.params?.id;

  try {
    const transactions = await TransactionModel.find().sort({ createdAt: -1 }).populate(populateArr).populate(populateObj);
    let temp = [];
    for (const tran of transactions) {
      if (tran.car_id.vendorID == id) {
        console.log('done ', tran.car_id);
        temp.push(tran);
      }
    }
    if (!temp.length) {
      return res.status(401).send({ message: 'No Transaction Found with this ID' });
    }
    return res.status(200).send({ message: `Transactions with User ID ${id}`, transactions: temp });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error?.message || 'Something went wrong', error });
  }
};
exports.getTransactionByID = async (req, res) => {
  const id = req?.params?.id;
  try {
    const transaction = await TransactionModel.findById(id);
    if (!transaction) {
      return res.status(401).send({ message: 'No transaction Found with this ID' });
    }
    return res.status(200).send({ message: `transaction with ${id}`, transaction });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error?.message || 'Something went wrong', error });
  }
};
