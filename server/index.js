import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import morgan from "morgan";

import authRoutes from "./routes/auth.js";

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
app.use(morgan("dev"));
app.use(express.json());

// router middlewares
app.use("/api", authRoutes);

// PORT
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`server running on ${port}`);
});
