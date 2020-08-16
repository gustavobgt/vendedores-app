const mongoose = require('mongoose');

let schema = mongoose.Schema({
  description: String,
  net_income: Number,
  employee_expenses: Number,
  category: String,
  year: Number,
  month: Number,
  score: Number,
  yearMonth: String,
  yearMonthDay: String,
  type: String,
});

const TransactionModel = mongoose.model('transaction', schema);

module.exports = TransactionModel;
