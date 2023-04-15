import ErrorHandler from "../middleware/ErrorMiddleware.js";
import { Todos } from "../models/TodoModels.js";

export const newTodo = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    await Todos.create({ title, description, user: req.user });
    res.status(200).json({ status: true, msg: "Todo added Successfully" });
  } catch (error) {
    console.log(error);
    next(err);
  }
};

export const getTodos = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const tasks = await Todos.find({ user: userId });
    res.status(201).json({
      succcess: true,
      tasks,
    });
  } catch (error) {
    console.log(error);
    next(err);
  }
};

export const updateTodos = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const todo = await Todos.findById(userId);
    if (!todo) {
      return next(new ErrorHandler("Invalid id", 404));
    }
    todo.isCompleted = !todo.isCompleted;
    await todo.save();
    res.status(200).json({
      succcess: true,
      msg: "To do updated successfully",
    });
  } catch (error) {
    console.log(error);
    next(err);
  }
};

export const deleteTodos = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const todo = await Todos.findById(userId);

    if (!todo) {
      return next(new ErrorHandler("Invalid id", 404));
    }

    await todo.deleteOne();
    res.status(200).json({ succcess: true, msg: "User deleted successfully" });
  } catch (error) {
    console.log(error);
    next(err);
  }
};
