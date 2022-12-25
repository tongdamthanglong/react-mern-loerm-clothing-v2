import express from "express";
import formidable from "express-formidable";
import { create, list, read, photo } from "../controllers/product.js";
import { requireSignin, isAdmin } from "../middlewares/auth.js";

const router = express.Router();

router.post("/product", requireSignin, isAdmin, formidable(), create);
router.get("/products", list);
router.get("/product/:slug", read);
router.get("/product/photo/:productId", photo);

export default router;
