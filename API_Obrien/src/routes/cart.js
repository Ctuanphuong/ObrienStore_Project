import { Router } from "express";
import authenticate from "../middlewares/authenticate.js";
import { authorization } from "../middlewares/authorization.js";
import {
  addToCart,
  checkOut,
  deleteAllProductCart,
  deleteProductCart,
  getCart,
  getCarts,
  updateCart,
} from "../controllers/cart.js";
const router = Router();

router.get("/cart", authenticate, authorization, getCarts);
router.get("/cart/:userId", authenticate, getCart);
router.post("/cart/add", authenticate, addToCart);
router.put("/cart/update", authenticate, updateCart);
router.post("/cart/delete", authenticate, deleteProductCart);
router.post("/cart/delete-all", authenticate, deleteAllProductCart);
router.post("/cart/checkout", authenticate, checkOut);
export default router;
