const Expense = require('../models/expense');

exports.saveExpense = async (req, res, next) => {
  try {
    const { description, amount, comment } = req.body;
    const user = req.user.id;
    const newExpense = await Expense.create({
      description,
      amount,
      comment,
      user,
    });
    res.status(201).json({ status: 'success', data: newExpense });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};
exports.getExpenses = async (req, res, next) => {
  try {
    // BUild the query
    // 1) Filtering
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);
    const query = await Expense.find({ user: req.user.id, ...req.query });

    // 2) Advanced filtering
    const queryStr = JSON.stringify(queryObj);
    queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `${match}`);

    // Execute query
    const expenses = await query;
    // Send response
    res.status(200).json(expenses);
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};
exports.getExpense = async (req, res, next) => {
  try {
    const expense = await Expense.findById(req.params.id);
    res.status(200).json({ status: 'success', data: expense });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};
exports.updateExpense = async (req, res, next) => {
  try {
    const updatedExpense = await Expense.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    res.status(201).json({
      status: 'success',
      data: updatedExpense,
    });
  } catch (error) {
    res.status(400).json({
      status: 'success',
      message: error,
    });
  }
};
exports.deleteExpense = async (req, res, next) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error,
    });
  }
};
