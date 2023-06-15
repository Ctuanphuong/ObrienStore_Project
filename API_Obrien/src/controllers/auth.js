import User from "../models/user.js";
import bcrypt from "bcryptjs";
import {
  generalAccessToken,
  generalRefreshToken,
} from "../services/jwtService.js";

// REGISTER
export const Register = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    // kiểm tra xem email đăng ký đã tồn tại trong db chưa
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

    // mã hóa password trước khi đăng ký
    const hashedPassword = await bcrypt.hash(password, 10);

    // tạo tài khoản
    const user = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
    });

    /*create accessToken
    // const accessToken = await generalAccessToken({
    //   _id: user._id,
    //   email,
    //   password: user.password,
   }); */

    // để role và password là undefined vì không muốn trả về khi thông báo thành công
    user.role = undefined;
    user.password = undefined;
    return res.status(200).json({
      message: "Account register successfully!",
      user,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

// LOGIN
export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // kiểm tra xem tài khoản có tồn tại hay không
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: `Account does not exist. Please check again`,
      });
    }

    // so sánh password gửi lên với password trong db có khớp không
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      return res.status(400).json({
        message: `Wrong password. Please try again!`,
      });
    }

    // tạo access token
    const accessToken = generalAccessToken({
      _id: user.id,
      email,
      role: user.role,
    });

    // tạo refresh token
    const refreshToken = generalRefreshToken({
      _id: user.id,
      email,
      role: user.role,
    });

    return res.status(200).json({
      message: "Login successfully!",
      accessToken,
      refreshToken,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

// REFRESH TOKEN
export const refreshToken = async (req, res) => {
  try {
    // lấy mã token gửi lên từ headers
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.status(400).json({
        message: "Token does not exist! Please try again.",
      });
    }

    // call hàm refreshTokenService() để xác thực token gửi lên có hợp lệ không
    // nếu hợp lệ, trả về payload chứa thông tin tài khoản
    const { payload } = refreshTokenService(token);

    // sau khi lấy được thông tin tài khoản, tạo access token mới
    const accessToken = generalAccessToken(payload);
    return res.status(200).json({
      message: "Refresh access token successfully!",
      accessToken,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
