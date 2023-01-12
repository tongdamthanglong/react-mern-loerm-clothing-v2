import express from "express";
import formidable from "express-formidable";
import {
  create,
  list,
  read,
  photo,
  remove,
  update,
  filteredProducts,
} from "../controllers/product.js";
import { requireSignin, isAdmin } from "../middlewares/auth.js";

const router = express.Router();

router.post("/product", requireSignin, isAdmin, formidable(), create);
router.get("/products", list);
router.get("/product/:slug", read);
router.get("/product/photo/:productId", photo);
router.delete("/product/:productId", requireSignin, isAdmin, remove);
router.put("/product/:productId", requireSignin, isAdmin, formidable(), update);
router.post("/filtered-products", filteredProducts);

export default router;
