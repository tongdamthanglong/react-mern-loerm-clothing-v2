import express from "express";
import {
  register,
  login,
  updateProfile,
  getOrders,
  secret,
} from "../controllers/auth.js";
import { requireSignin, isAdmin } from "../middlewares/auth.js";

const router = express.Router();

// register account
router.post("/register", register);

// login account
router.post("/login", login);

// auth-check user access PrivateRoute
router.get("/auth-check", requireSignin, (req, res) => res.json({ ok: true }));

// auth-check admin-check admin access AdminRoute
router.get("/admin-check", requireSignin, isAdmin, (req, res) =>
  res.json({ ok: true })
);

// update user profile
router.put("/profile", requireSignin, updateProfile);

// orders
router.get("/orders", requireSignin, getOrders);

// secret route test
router.get("/secret", requireSignin, isAdmin, secret);

export default router;
