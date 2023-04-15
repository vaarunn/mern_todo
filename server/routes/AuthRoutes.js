import { Router } from "express";
import {
  getMyProfile,
  login,
  logout,
  register,
} from "../controllers/AuthController.js";
import { isAuthenticated } from "../middleware/AuthMiddleware.js";

const routes = Router();

routes.post("/register", register);

routes.post("/login", login);

routes.post("/logout", logout);

routes.get("/me", isAuthenticated, getMyProfile);

export default routes;
