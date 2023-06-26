import User from "../models/user.js";
import dotenv from "dotenv";
import { generalVerifyToken } from "../services/jwtService.js";
import jwt from "jsonwebtoken";
dotenv.config();
const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new Error("You must be logged in to perform this action!");
    }

    const accessToken = authHeader && authHeader.split(" ")[1];

    let payload = "";
    try {
      payload = generalVerifyToken({
        accessToken,
        privateKey: process.env.JWT_PRIVATE,
      });
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new Error("Token has expired! Please login again.");
      } else {
        throw new Error("Invalid JWT token.");
      }
    }

    const { _id } = payload.payload;
    //get User
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not found!");
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export default authenticate;
