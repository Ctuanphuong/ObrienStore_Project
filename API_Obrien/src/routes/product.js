import { Router } from "express";
import {
  addProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../controllers/product.js";
import authenticate from "../middlewares/authenticate.js";
import { authorization } from "../middlewares/authorization.js";
const router = Router();

router.get("/products", getProducts);
router.get("/products/:id", getProduct);
router.post("/products", authenticate, authorization, addProduct);
router.put("/products/:id", authenticate, authorization, updateProduct);
router.delete("/products/:id", authenticate, authorization, deleteProduct);

export default router;
