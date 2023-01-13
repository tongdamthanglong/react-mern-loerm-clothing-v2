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
  productsCount,
  listProducts,
} from "../controllers/product.js";
import { requireSignin, isAdmin } from "../middlewares/auth.js";

const router = express.Router();

// create product by admin
router.post("/product", requireSignin, isAdmin, formidable(), create);

// get all products
router.get("/products", list);

// get each product by slug
router.get("/product/:slug", read);

// get product photo by id
router.get("/product/photo/:productId", photo);

// delete product by admin
router.delete("/product/:productId", requireSignin, isAdmin, remove);

// update product by admin
router.put("/product/:productId", requireSignin, isAdmin, formidable(), update);

// filter product by category and price
router.post("/filtered-products", filteredProducts);

// paginate load more product
router.get("/products-count", productsCount);
router.get("/list-products/:page", listProducts);

export default router;
