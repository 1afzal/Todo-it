import { Router } from "express";
const todoRouter = Router();
import { todoModel } from "../models/todoModel.js";

todoRouter.get("/all", async(req, res) => {
  try{
    const todos = await todoModel.find({})
    res.status(200).json({
      data: todos 
    })
  }
  catch(err){
    console.log(err.message);
    res.status(400).json({
      message: err.message
    })
  }
});

todoRouter.get("/todo/:id", () => {});

todoRouter.post("/post/todo", async (req, res) => {
  try {
    const newTodo = await todoModel.create({
      title: req.body.title,
      description: req.body.description,
      isCompleted: req.body.isCompleted,
      priority: req.body.priority,
      duedate: req.body.duedate,
      user: req.body.user,
    });
    console.log(`New todo created -> ${newTodo.title}`)
    res.status(200).json({
        message: "new todo created",
        title: newTodo.title
    })
  } catch (err) {
    console.log(`Todo post error: ${err.message}`);
    res.status(400).send({
        message: err.message
    })
  }
});

todoRouter.put("/update/todo", (req, res) => {});

todoRouter.delete("/todo/delete", (req, res) => {});
export default todoRouter;
