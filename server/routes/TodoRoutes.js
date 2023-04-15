import { Router } from "express";
import {
  deleteTodos,
  getTodos,
  newTodo,
  updateTodos,
} from "../controllers/TodoController.js";
import { isAuthenticated } from "../middleware/AuthMiddleware.js";

const router = Router();

router.post("/newTodo", isAuthenticated, newTodo);

router.get("/getTodos", isAuthenticated, getTodos);

router
  .route("/:id")
  .put(isAuthenticated, updateTodos)
  .delete(isAuthenticated, deleteTodos);

export default router;
