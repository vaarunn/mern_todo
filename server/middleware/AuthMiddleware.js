import Users from "../models/AuthModels.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      res.status(404).json({
        msg: "login first",
      });
      return;
    }

    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await Users.findById(data._id);
    next();
  } catch (error) {
    console.log(error);
  }
};
