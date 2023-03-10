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
  productsSearch,
  relatedProducts,
  getToken,
  processPayment,
  orderStatus,
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

// search product by keyword
router.get("/products/search/:keyword", productsSearch);

// related category product
router.get("/related-products/:productId/:categoryId", relatedProducts);

// create token and transaction
router.get("/braintree/token", getToken);
router.post("/braintree/payment", requireSignin, processPayment);

// update order status
router.put("/order-status/:orderId", requireSignin, isAdmin, orderStatus);

export default router;
