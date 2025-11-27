import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
    trim: true,
    maxlength: [50, "Name can't be more than 50 ch"],
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please add a valid email",
    ],
  },
  password: {
    type: String,
    required: [true, "Enter a password"],
    trim: true,
    maxlength: [50, "password cant be more than 50 ch"],
    minlength: [6, "min len is 6"],
    select: false,
  },
  role: {type:String, enum: ["user","admin"], default: "user"}
});

const userModel = mongoose.model("user", userSchema);

export {userModel}