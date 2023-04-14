import { Router } from "express";
import {
  getMyProfile,
  login,
  register,
} from "../controllers/AuthController.js";

const routes = Router();

routes.post("/register", register);

routes.post("/login", login);
routes.post("/logout", login);

// routes.get("/me", getMyProfile);

export default routes;
