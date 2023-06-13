import User from "../models/user.js";
import bcrypt from "bcryptjs";
import {
  generalAccessToken,
  generalRefreshToken,
} from "../services/JwtService.js";

//Register
export const Register = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    //check email or phone already exists or not
    const userExists = await User.findOne({ email });
    const phoneExists = await User.findOne({ phone });
    if (userExists) {
      return res.status(400).json({
        message: `Email already exists. Please choose another email!`,
      });
    } else if (phoneExists) {
      return res.status(400).json({
        message: `Phone number already exists. Please choose another phone number!`,
      });
    }

    //hash password before register
    const hashedPassword = await bcrypt.hash(password, 10);

    //create user
    const user = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
    });

    //create accessToken
    const accessToken = await generalAccessToken({
      _id: user._id,
      email,
      password: user.password,
    });
    return res.status(200).json({
      message: "Account register successfully!",
      accessToken,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

//Login
export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    //check user before login
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: `Account does not exist. Please check again`,
      });
    }

    //check match password
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      return res.status(400).json({
        message: `Wrong password. Please try again!`,
      });
    }

    //create token
    const accessToken = await generalAccessToken({
      _id: user.id,
      email,
      password: user.password,
    });

    const refreshToken = await generalRefreshToken({
      _id: user.id,
      email,
      password: user.password,
    });

    return res.status(200).json({
      message: "Login successfully!",
      accessToken,
      refreshToken,
    });

    //create token
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
