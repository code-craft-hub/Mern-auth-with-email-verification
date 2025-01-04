import express from "express";
import connectToDatabase from "./config/db";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import errorHandler from "./middleware/errorHandler";
import authRoutes from "./routes/auth.route";

dotenv.config();

const PORT = process.env.PORT || 5001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.APP_ORIGIN,
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/auth", authRoutes);

app.use(errorHandler);
app.listen(PORT, () => {
  console.log("server is running on port : " + PORT);
  connectToDatabase();
});
