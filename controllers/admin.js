const Expense = require('../models/Expense');
const User = require('../models/User')
const DLArchive = require('../models/DLArchive')
const sequelize = require('../util/database')
const S3Services = require('../services/s3services')
require('dotenv').config()
const UserServices = require('../services/userservices')
const mongoose = require('mongoose')
exports.getArchive = async (req, res, next) => {
  try {
    // Find archives using Mongoose
    const archives = await DLArchive.find({ userId: req.user.id })
      .sort({ createdAt: -1 }) // Sort in descending order by createdAt

    return res.status(200).json({ allDl: archives, success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ allDl: '', success: false });
  }
};

exports.getExpense = async (req, res, next) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user._id); // Create an ObjectId for the user's _id

    const expenses = await Expense.find({ userId: userId });

    return res.status(200).json({ allExp: expenses, success: true, user: req.user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false });
  }
};

exports.postExpense = async (req, res, next) => {
  const { amount, description, category } = req.body;
  try {
    const expense = new Expense({
      amount: amount,
      description: description,
      category: category,
      userId: req.user._id, // Assuming the user ID is stored in "_id" field
    });

    const data = await expense.save();
    console.log('Added expenses');

    const user = await User.findById(req.user._id);

    if (!user.totalExp) {
      user.totalExp = 0.0;
    }

    user.totalExp += parseFloat(amount);

    await user.save();

    return res.status(201).json({ newExpDetail: data, user: user });
  } catch (e) {
    return res.status(500).json({
      error: e,
    });
  }
};
exports.deleteExpense = async (req, res, next) => {
  const delexp =  new mongoose.Types.ObjectId(req.params.id);
  const userId = new mongoose.Types.ObjectId(req.user._id)
  if (delexp == undefined || delexp.length == 0) {
    return res.status(400).json({ success: false });
  }
  try {
    const expense = await Expense.findOne({
      _id: delexp, // Assuming "_id" is used for expense IDs
      userId:userId, // Assuming "_id" is used for user IDs
    });

    if (!expense) {
      return res.status(404).json({ success: false, message: "Expense not found" });
    }

    await Expense.deleteOne({ _id: delexp });

    const user = await User.findById(userId);

    user.totalExp -= expense.amount;

    await user.save();

    return res.status(200).json({ success: true, message: "Deleted Successfully", user: user });
  } catch (err) {
    console.error(err);

    return res.status(500).json({ success: false, message: "Failed", user: user });
  }
};
exports.downExpenses = async (req, res) => {
  try {
    const expenses = await UserServices.getExpenses(req)
    const stringifiedExp = JSON.stringify(expenses)
    const filename = `Expense_${req.user.id}_${new Date()}.txt`
    const fileUrl = await S3Services.uploadToS3(stringifiedExp, filename)
    // console.log(fileUrl)
    await DLArchive.create({ fileUrl: fileUrl, userId: req.user.id })
    res.status(201).json({ fileUrl: fileUrl, success: true })
  }
  catch (err) {
    res.status(500).json({ fileUrl: '', success: false, error: err })
  }
}



