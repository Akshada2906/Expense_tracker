const UserModel = require("../database/userModel");
const IncomeModel = require("../database/incomeSchema");
const ExpenseModel = require("../database/expenseSchema")
const { v4: uuid } = require("uuid");

/////Create
// const signupHandler = async (req, res) => {
//   const { name, age, address, email, password } = req.body;
//   try {
//     const newUser = new UserModel({ name, age, address, email, password });
//     await newUser.save();
//     res.status(201).send(newUser);
//   } catch (error) {
//     res.status(404).send(error);
//   }
// };

const signupHandler = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const newUser = new UserModel({ username, email, password });
    await newUser.save();
    if (newUser) {
      res.status(200).send({
        message: "User successfully created",
        status: true,
        data: {
          userId: newUser.userId,
          username: newUser.username,
          email: newUser.email,
          password: newUser.password,
        },
      });
    } else {
      res.status(400).send({
        message: "User not found",
        status: false,
      });
    }
  } catch (error) {
    res.status(404).send(error);
  }
};
const loginHandler = async (req, res) => {
  const { email, password } = req.body;
  try {
    const newUser = await UserModel.findOne({ email });
    if (newUser) {
      if (newUser.password == password) {
        res.status(201).send({
          message: "Login successfull",
          status: true,
          data: {
            username: newUser.username,
            userId: newUser.userId,
            email: newUser.email,
          },
        });
      } else {
        res.status(400).send({
          message: "Invalid password",
          status: false,
        });
      }
    } else {
      res.status(401).send({
        message: "Invalid email-password",
        status: false,
      });
    }
  } catch (error) {
    res.status(404).send(error);
  }
};

const incomehandler = async (req, res) => {
  try {
    const incomeData = req.body;
    const newIncome = new IncomeModel(incomeData);
    await newIncome.save();
    res.status(201).json({
      message: "Income data saved successfully",
      status: true,
      data: newIncome
    });
  } catch (error) {
    res.status(400).json({
      message: "Error saving income data",
      status: false,
      error: error.message
    });
  }
};

const expensehandler = async (req, res) => {
  try {
    const expenseData = req.body;
    const newIncome = new ExpenseModel(expenseData);
    await newIncome.save();
    res.status(201).json({
      message: "Expense data saved successfully",
      status: true,
      data: expenseData
    });
  } catch (error) {
    res.status(400).json({
      message: "Error saving expense data",
      status: false,
      error: error.message
    });
  }
};



// Read all users
const readUserById1 = async (req, res) => {
  const userId = req.query.userId;
  try {
    const users = await UserModel.findOne({ userId });
    if (users) {
      res.status(200).send({
        message:"User found",
        status:true,
        data:{
          username:users.username,
          email:users.email,
          password:users.password,
          userId:users.userId,
        }
      });
    } else {
      res.status(400).send({
        message: "No user found",
        status: false,
      });
    }
  } catch (error) {
    throw error;
  }
};

// Read user by ID
const readUserById = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await UserModel.findOne({ id });
    if (user) {
      res.status(200).send({
        message: "Successfully read",
        status: true,
        data: user,
      });
    } else {
      res.status(400).send({
        message: "Something went wrong",
        status: false,
        data: {},
      });
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

// Read user by name
const readUserByName = async (req, res) => {
  const { username } = req.query;
  try {
    const user = await UserModel.findOne({ username });

    if (user) {
      res.status(200).send({
        message: "Successfully read",
        status: true,
        data: user,
      });
    } else {
      res.status(400).send({
        message: "Something went wrong",
        status: false,
        data: {},
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Update user
const updateUser = async (req, res) => {
  const { userId } = req.query;
  const { username, email, password } = req.body;
  console.log(userId, username);
  const options = {
    new: true,
  };
  try {
    const updatedUser = await UserModel.findOneAndUpdate(
      { userId },
      {
        username,
        email,
        password,
      },
      options
    );
    console.log(updatedUser, "updateduser");
    if (updatedUser) {
      res.status(200).send({
        message: "Successfully updated",
        status: true,
        data: updatedUser,
      });
    } else {
      res.status(400).send({
        message: "No user found",
        status: false,
      });
    }
  } catch (error) {
    res.status(401).send(error);
  }
};

// Delete user
const deleteUser = async (req, res) => {
  const { userId } = req.query;
  const { userId: deletedId } = req.body;
  try {
    const deletedUser = await UserModel.findOneAndDelete(
      { userId },
      { userId: deletedId }
    );
    if (deletedUser) {
      res.status(200).send({
        message: "Successfully deleted",
        status: true,
        data: deletedUser,
      });
    } else {
      res.status(400).send({
        message: "No user found",
        status: fail,
      });
    }
  } catch (error) {
    throw error;
  }
};

module.exports = {
  signupHandler,
  loginHandler,
  incomehandler,
  expensehandler,
  readUserById1,
  readUserById,
  readUserByName,
  updateUser,
  deleteUser,
};
