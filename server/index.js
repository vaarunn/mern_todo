import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRouters from "./routes/AuthRoutes.js";
import todoRouters from "./routes/TodoRoutes.js";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middleware/ErrorMiddleware.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRouters);

app.use("/api/v1/todos", todoRouters);

//custom middleware to handle errors and to make code pretty lol
app.use(errorHandler);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(process.env.PORT, () => {
      console.log(
        `listening at port ${process.env.PORT} in ${process.env.NODE_ENV} mode`
      );
    });
  } catch (error) {
    console.log(error);
  }
};

connectDB();
