import { Router } from "express";
import { userModel } from "../models/userModel.js";
import bcrypt from "bcrypt"
import z from "zod";
const userRouter = Router();
const JWT_SECRET_KEY = process.env.JWT_SECRET;


userRouter.post(`/signup`, async (req, res) => {

    const requiredBody = z.object({
        email: z.string().min(3).max(50).email(),
        password: z.string().min(6).max(500),
        name:z.string().min(2).max(50),
        role:z.string().min(1).max(10)
    });

    const parseDataSuccess = requiredBody.safeParse(req.body);
    if(!parseDataSuccess){
        return res.status(400).json({
            message: "invalid credentials"
        })
    }
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

userRouter.post(`/signin`, () => {

});
export default userRouter;
