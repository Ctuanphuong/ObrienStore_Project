import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import connectDB from "./configs/database.js";
import authRouter from "./routes/auth.js";
import userRouter from "./routes/user.js";
import productRouter from "./routes/product.js";
import categoryRouter from "./routes/category.js";
import uploadRouter from "./routes/upload.js";
import cartRouter from "./routes/cart.js";
import billRouter from "./routes/bill.js";
import cors from "cors";
const app = express();
app.use(express.json());
dotenv.config();

//connect to MongoDB
connectDB(process.env.MONGO_URL);

// use Morgan to logging http request response from server
app.use(morgan("tiny"));
app.use(cors());

//middleware
app.use("/api", authRouter);
app.use("/api", userRouter);
app.use("/api", productRouter);
app.use("/api", categoryRouter);
app.use("/api", uploadRouter);
app.use("/api", cartRouter);
app.use("/api", billRouter);
//app listen
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
