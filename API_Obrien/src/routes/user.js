import { Router } from "express";
import {
  changePassword,
  deleteUser,
  forgotPassword,
  getUserProfile,
  resetPassword,
  updateUserProfile,
  verifyToken,
} from "../controllers/user.js";
import authenticate from "../middlewares/authenticate.js";
import authorization from "../middlewares/authorization.js";
const router = Router();
router.get("/user/profile/:id", getUserProfile);
router.put("/user/update/:id", updateUserProfile);
router.delete("/user/delete/:id", authenticate, authorization, deleteUser);
router.post("/user/change-password", changePassword);
router.post("/user/forgot-password", forgotPassword);
router.post("/user/reset-password", verifyToken, resetPassword);

export default router;
