import express, { urlencoded } from "express";
import dotenv from "dotenv"
dotenv.config();
import mongoose from "mongoose"
const app = express();
const PORT=process.env.PORT;
app.use(express.json());
app.use(express.json());
import todoRouter from "../routes/todoRoutes.js";
import userRouter from "../routes/userRoutes.js";
import connectDB from "./connectDB.js";
import { userModel } from "../models/userModel.js";
import { todoModel } from "../models/todoModel.js";

connectDB();
app.use('/user',userRouter);
app.use('/todos',todoRouter);

app.listen(PORT,()=>{
    console.log(`Server is live at PORT ${PORT}`);
})
