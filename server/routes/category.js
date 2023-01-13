import express from "express";
import { create, update, remove, list, read } from "../controllers/category.js";
import { requireSignin, isAdmin } from "../middlewares/auth.js";

const router = express.Router();

// create category by admin
router.post("/category", requireSignin, isAdmin, create);

// update category by admin
router.put("/category/:categoryId", requireSignin, isAdmin, update);

// delete category by admin
router.delete("/category/:categoryId", requireSignin, isAdmin, remove);

// get all categories
router.get("/categories", list);

// get each category by slug
router.get("/category/:slug", read);

export default router;
