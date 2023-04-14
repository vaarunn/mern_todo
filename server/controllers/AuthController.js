import Users from "../models/AuthModels.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  const { name, password } = req.body;

  try {
    const searchUser = await Users.findOne({ name });
    if (searchUser) {
      res.json({
        success: false,
        msg: "User already exists",
      });
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await Users.create({ name, password: hashedPassword });
    const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET);
    res.status(201).cookie("token", token, { httpOnly: true }).json({
      success: true,
      msg: "User registered successfully",
      newUser,
    });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  const { name, password } = req.body;

  try {
    const searchUser = await Users.findOne({ name }).select("+password");
    if (!searchUser) {
      res.send({
        success: false,
        msg: "Invalid email or password",
      });
      return;
    }
    const passwordCheck = bcrypt.compare(password, searchUser.password);
    const token = jwt.sign({ name }, process.env.JWT_SECRET);
    if (passwordCheck) {
      res.cookie("token", token, { httpOnly: true }).json({
        success: true,
        msg: "Login was successful",
        searchUser,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getMyProfile = async (req, res) => {
  const { token } = req.cookies;
  if (!token) {
    res.status(404).json({
      msg: "login first",
    });
    return;
  }
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    const userData = await Users.findById(data._id);
    console.log(data, process.env.JWT_SECRET);

    res.status(200).json({
      success: true,
      // userData,
    });
  } catch (error) {
    console.log(error);
  }
};

export const logout = (req, res) => {
  res
    .status(200)
    .cookie("token", "", { expires: new Date(Date.now()) })
    .json({
      success: true,
      msg: "logged out",
    });
};
