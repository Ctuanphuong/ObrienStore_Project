import { Router } from "express";
import { Login, Register, refreshToken } from "../controllers/auth.js";
const router = Router();
router.post("/register", Register);
router.post("/login", Login);
router.post("/refresh-token", refreshToken);
export default router;
