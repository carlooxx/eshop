import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import productRoute from "./routes/productRoute.js";
import userRoute from "./routes/userRoute.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
const app = express();

app.use(express.json());
dotenv.config();
//Connect DB
mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  console.log("Connected to DB")
);
app.use("/api/products", productRoute);
app.use("/api/user", userRoute);

app.get("/", (req, res) => {
  res.send("API is running");
});
app.use(notFound);
app.use(errorHandler);
app.listen(5000, console.log("Server running on port 5000"));
