const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://localhost:27017/crud');
}

const IncomeSchema = new mongoose.Schema({
  userId: {
    type: String,
    default: uuidv4,
    unique: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  gratuity: {
    type: Number,
    required: true,
  },
  provident: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  }
});

const IncomeModel = mongoose.model("incomes", IncomeSchema);

module.exports = IncomeModel;
