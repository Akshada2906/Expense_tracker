const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://localhost:27017/crud');
}

const ExpenseSchema = new mongoose.Schema({
  userId: {
    type: String,
    default: uuidv4,
    unique: true,
  },
  date: {
    type: Date,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  payment: {
    type: String,
    required: true,
  }
});

const ExpenseModel = mongoose.model("expenses", ExpenseSchema);

module.exports = ExpenseModel;

