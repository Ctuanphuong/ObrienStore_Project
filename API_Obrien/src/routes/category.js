import { Router } from "express";
import {
  addCategory,
  deleteCategory,
  getCategories,
  getCategory,
  updateCategory,
} from "../controllers/category.js";
import authenticate from "../middlewares/authenticate.js";
import { authorization } from "../middlewares/authorization.js";
const router = Router();

router.get("/categories", getCategories);
router.get("/categories/:id", getCategory);
router.post("/categories", authenticate, authorization, addCategory);
router.put("/categories/:id", authenticate, authorization, updateCategory);
router.delete("/categories/:id", authenticate, authorization, deleteCategory);

export default router;
