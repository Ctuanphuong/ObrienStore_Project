import { Router } from "express";
import authenticate from "../middlewares/authenticate.js";
import { authorization } from "../middlewares/authorization.js";
import { getBill, getBills, updateBill } from "../controllers/bill.js";
const router = Router();
router.get("/bills", authenticate, getBills);
router.get("/bills/:idBill", authenticate, getBill);
router.put("/bills/update/:idBill", authenticate, authorization, updateBill);
export default router;
