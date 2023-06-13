import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import authRouter from "./routes/auth.js";
import userRouter from "./routes/user.js";

const app = express();
app.use(express.json());
dotenv.config();

//connect to MongoDB
connectDB(process.env.MONGO_URL);

// use Morgan to logging http request response from server
app.use(morgan("tiny"));

//middleware
app.use("/api", authRouter);
app.use("/api", userRouter);
//app listen
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
