import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRouters from "./routes/AuthRoutes.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRouters);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(process.env.PORT, () => {
      console.log(`listening at port ${process.env.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

connectDB();
