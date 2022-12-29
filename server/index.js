import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";

import authRoutes from "./routes/auth.js";
import categoryRoutes from "./routes/category.js";
import productRoutes from "./routes/product.js";

const app = express();

dotenv.config();

// db
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("DB Connected");
  })
  .catch((error) => console.log(`DB Errored!: ${error}`));

// middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// router middlewares
app.use("/api", authRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);

// PORT
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`server running on ${port}`);
});
