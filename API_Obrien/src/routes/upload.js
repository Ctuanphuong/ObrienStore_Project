import { Router } from "express";
import { uploadCloud } from "../middlewares/upload.js";
import {
  deleteImage,
  updateImage,
  uploadImage,
} from "../controllers/upload.js";
const router = Router();

router.post("/images/upload", uploadCloud.array("images", 10), uploadImage);
router.delete("/images/:publicId", deleteImage);
router.put("/images/:publicId", uploadCloud.array("images", 10), updateImage);
export default router;
