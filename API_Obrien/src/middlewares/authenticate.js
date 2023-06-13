import jwt from "jsonwebtoken";
import User from "../models/user.js";
import dotenv from "dotenv";
import { generalVerifyToken } from "../services/JwtService.js";
dotenv.config();
const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader)
      throw new Error("You must be logged in to perform this action!");

    const accessToken = authHeader && authHeader.split(" ")[1];

    const { payload } = generalVerifyToken({
      accessToken,
      privateKey: process.env.JWT_PRIVATE,
    });

    const { _id } = payload;
    //get User
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not found!");
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export default authenticate;
