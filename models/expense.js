const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
  },
  createdDate: {
    type: Date,
    default: Date.now(),
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
  },
  amount: {
    type: Number,
    required: [true, 'Amount is required'],
  },
  commment: {
    type: String,
  },
});
const Expense = mongoose.model('Expense', expenseSchema);
module.exports = Expense;
