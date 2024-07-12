const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const AutoIncrement = require("mongoose-sequence")(mongoose);

main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://localhost:27017/crud');

}

// mongoose.connect("mongodb://localhost:27017/crud");

const UserSchema = new mongoose.Schema({
  userId: {
    type: String,
    default: uuidv4,
    unique: true,
  },
  // id: {
  //   type: Number,
  //   unique: true,
  // },
  username: {
    type:String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: { 
    type: String, 
    required: true, 
    minlength: 3
  },
  // salary:{
  //   type:Number,
  //   required:true,
  // },
  // source:{
  //   type:String,
  //   required:true,
  // },
  // gratuity:{
  //   type:Number,
  //   required:true,
  // },
  // provident:{
  //   type:Number,
  //   required:true,
  // },
  // date:{
  //   type:Date,
  //   required:true,
  // }
});

UserSchema.plugin(AutoIncrement, { inc_field: "id" });

const UserModel = mongoose.model("users", UserSchema);

module.exports = UserModel;
