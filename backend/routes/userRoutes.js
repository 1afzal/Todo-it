import { Router } from "express";
import { userModel } from "../models/userModel.js";
import bcrypt from "bcrypt"
const userRouter = Router();

userRouter.post(`/signup`, async (req, res) => {
  const { email, password, name, role } = req.body;
  if (!name || !email || !password) {
    console.log("invalid credentials");
    return res.status(400).json({
      message: "Invalid credentials",
    });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password,salt)
  try {
    const newUser = await userModel.create({
      name: name,
      email: email,
      password: hashedPassword,
      role: role,
    });
    console.log(newUser);
    console.log("signup successfull");
    res.status(200).json({
      message: "Signup successfull",
    });
  } catch (err) {
    console.log(err.message);
  }
});

userRouter.post(`/signin`, () => {});
export default userRouter;
