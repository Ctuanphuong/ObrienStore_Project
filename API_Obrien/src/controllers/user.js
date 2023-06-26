import User from "../models/user.js";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config();

// GET USER
export const getUserProfile = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(400).json({
        message: "User information not found!",
      });
    }

    return res.status(200).json({
      message: "User information retrieved successfully!",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE USER
export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    const userData = req.body;

    const user = await User.findOne({ _id: userId });

    //check phone exists in another account
    const phoneExists = await User.findOne({ phone: req.body.phone });
    if (phoneExists) {
      const parsedReqPhone = parseInt(req.body.phone);
      const parsedExistsPhone = parseInt(phoneExists?.phone);

      if (
        phoneExists &&
        parsedReqPhone !== user.phone &&
        parsedReqPhone === parsedExistsPhone
      ) {
        return res.status(400).json({
          message: `The phone number is already in use in another account. Please choose another phone number`,
        });
      }
    }

    const userUpdated = await User.findByIdAndUpdate(
      { _id: userId },
      userData,
      {
        new: true,
      }
    );

    if (!userUpdated) {
      return res.status(400).json({
        message: "Couldn't find an account to update!",
      });
    }

    return res.status(200).json({
      message: "Account update successfully!",
      user: userUpdated,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE USER
export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const userDeleted = await User.findByIdAndDelete({ _id: userId });
    if (!userDeleted) {
      return res.status(400).json({
        message: "Couldn't find user information to delete!",
      });
    }

    return res.status(200).json({
      message: "Account deleted successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
// CHANGE PASSWORD
export const changePassword = async (req, res) => {
  try {
    const { email, password, rePassword, newPassword, confirmPassword } =
      req.body;

    //check user exists or not
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: `Account does not exist. Please check again`,
      });
    }

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res.status(400).json({
        message: `Wrong password. Please try again!`,
      });
    }

    const reCheckPassword = await bcrypt.compare(rePassword, user.password);
    if (!reCheckPassword) {
      return res.status(400).json({
        message: `You entered the wrong old password. Please try again!`,
      });
    }

    const sameOldPassword = await bcrypt.compare(newPassword, user.password);
    if (sameOldPassword) {
      return res.status(400).json({
        message:
          "You just re-entered the old password. Please choose another password!",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const userChangedPassword = await User.findByIdAndUpdate(
      { _id: user._id },
      {
        password: hashedPassword,
      },
      { new: true }
    );
    return res.status(200).json({
      message: "Change password successfully!",
      userChangedPassword,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// FORGET PASSWORD
// An object that stores temporary information about the password reset code

export const forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: `The account does not exist with the email you entered`,
      });
    }

    // Tạo mã xác thực ngẫu nhiên
    const verifyToken = crypto.randomBytes(3).toString("hex").toUpperCase();

    // Lưu mã vào db, collection User
    user.verifyToken = verifyToken;
    await user.save();

    // Tạo nội dung của mail
    const mailOptions = {
      from: `Obrien Store 🍏 ${process.env.EMAIL_SENDER}`,
      to: email,
      subject: "Reset Your Password",
      html: `<p style="font-size: 16px; color: #002140; font-weight: 600;">You have requested to reset your password. Please enter the verification code:</p>
      <p><strong style="font-size: 18px; color: #E98C81;">${verifyToken}</strong></p>`,
    };

    // Gửi email đến địa chỉ của người dùng yêu cầu đặt lại mật khẩu
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      service: "gmail",
      auth: {
        user: process.env.EMAIL_SENDER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Gửi mail với transporter đã được config xong
    const info = await transporter.sendMail(mailOptions);
    if (!info) {
      return res.status(400).json({
        message: "An error occurred while sending the email!",
      });
    }

    res.status(200).json({
      message: "Password reset code has been sent to your email. Please check.",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// MIDDLEWARE VERIFY EMAIL TOKEN
export const verifyToken = async (req, res, next) => {
  const { email, verifyToken } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Can't find the account to verify!",
      });
    }

    const storedToken = user.verifyToken;

    // Check xem token người dùng gửi lên có khớp với token trong db không
    if (!verifyToken || (verifyToken && verifyToken !== storedToken)) {
      return res.status(400).json({
        message: "Invalid verification code! Please check again.",
      });
    }

    res.status(200).json({
      message: "Verification successfully! You can reset your password now!",
    });

    next();
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// RESET PASSWORD
export const resetPassword = async (req, res) => {
  try {
    const { email, verifyToken, password } = req.body;
    console.log(email);
    console.log(verifyToken);
    const user = await User.findOne({ email, verifyToken });
    if (!user) {
      return res.status(400).json({
        message: "Account not found!",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    await user.save();

    // Sau khi đã reset mật khẩu, đặt verifyToken trong db thành rỗng
    user.verifyToken = "";
    await user.save();

    return res
      .status(200)
      .json({ message: "Password reset successfully! Please login." });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
