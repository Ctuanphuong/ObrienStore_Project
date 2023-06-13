import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const generalAccessToken = (payload) => {
  const accessToken = jwt.sign({ payload }, process.env.JWT_PRIVATE, {
    expiresIn: "1h",
  });
  return accessToken;
};

export const generalRefreshToken = (payload) => {
  const refreshToken = jwt.sign({ payload }, process.env.JWT_PRIVATE, {
    expiresIn: "30d",
  });
  return refreshToken;
};

export const generalVerifyToken = (payload) => {
  const verifyToken = jwt.verify(payload.accessToken, payload.privateKey);
  return verifyToken;
};
