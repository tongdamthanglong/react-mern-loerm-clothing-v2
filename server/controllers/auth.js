import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user.js";
import Order from "../models/order.js";
import { hashPassword, comparePassword } from "../helpers/auth.js";

dotenv.config();

export const register = async (req, res) => {
  try {
    // 1. destructure name, email, password from req.body
    const { name, email, password } = req.body;

    // 2. all fields require validation
    if (!name.trim()) {
      return res.json({ error: "Name is required." });
    }
    if (!email) {
      return res.json({ error: "Email has been taken." });
    }
    if (!password || password.length < 6) {
      return res.json({ error: "Password must longer than 6 characters." });
    }
    // 3. check if email is taken
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.json({ error: "Email has been taken." });
    }

    // 4. hash password
    const hashedPassword = await hashPassword(password);

    // 5. register user
    const user = await new User({
      name,
      email,
      password: hashedPassword,
    }).save();

    // 6. create token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // 7. send response
    res.json({
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        address: user.address,
      },
      token,
    });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  try {
    // 1. destructure email, password from req.body
    const { email, password } = req.body;

    // 2. all fields require validation
    if (!email) {
      return res.json({ error: "Email has been taken." });
    }
    if (!password || password.length < 6) {
      return res.json({ error: "Password must longer than 6 characters." });
    }
    // 3. check if email is taken
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.json({ error: "User not found." });
    }

    // 4. compare password
    const match = await comparePassword(password, user.password);

    if (!match) {
      return res.json({ error: "Wrong password!" });
    }

    // 5. create signed jwt
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // 6. send response
    res.json({
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        address: user.address,
      },
      token,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { name, address, password } = req.body;
    const user = await User.findById(req.user._id);
    // check password length
    if (password && password.length < 6) {
      return res.json({
        error: "Password is required and more than 6 characters.",
      });
    }
    // hash password
    const hashedPassword = password ? await hashPassword(password) : undefined;

    const updated = await User.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        address: address || user.address,
      },
      { new: true }
    );
    updated.password = undefined;
    res.json(updated);
  } catch (error) {
    console.log(error);
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ buyer: req.user._id })
      .populate("products", "-photo")
      .populate("buyer", "name");
    res.json(orders);
  } catch (error) {
    console.log(error);
  }
};

export const secret = async (req, res) => {
  res.json({ currentUser: req.user });
};
