import { Router } from "express";
import { userModel } from "../models/userModel.js";
import bcrypt from "bcrypt"
import z, { jwt } from "zod";
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

userRouter.post(`/signin`, async(req,res) => {

    const requiredBody = z.object({
        email: z.string().min(3).email(),
        password: z.string().min(3),
    });

    const parseDataSuccess = requiredBody.safeParse(req.body);

    if(!parseDataSuccess){
        console.log("Invalid credentials");
        return res.status(400).json({
            message: "Invalid credentials"
        })
    }
    try{
    const { email,password } = req.body;
    if(!email || !password){
        return res.status(404).json({
            message: "Enter complete credentials"
        })
    }
    const user = await userModel.findOne({email : email});

    const isPasswordMatch = await bcrypt.compare(password,user.password);

    if(isPasswordMatch){
        const token = await jwt.sign({id: user._id},JWT_SECRET_KEY)
        res.status(200).json({
            message: "succesfull signup",
            token: token
        })
    }
    else{
        res.status(400).json({
            message: "signin error"
        })
    }
}
catch(err){
    console.log(err.message)
    res.status(400).json({
        message: err.message
    })
}
});
export default userRouter;
