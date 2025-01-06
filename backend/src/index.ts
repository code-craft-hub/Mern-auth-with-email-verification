import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import express from "express";
import connectToDatabase from "./config/db";
import errorHandler from "./middleware/errorHandler";
import authRoutes from "./routes/auth.route";
import { PORT } from "./constants/env";
import authenticate from "./middleware/authenticate";
import userRoutes from "./routes/user.route";
import sessionRoutes from "./routes/session.route";

const port = PORT || 5001;
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// auth routes

app.use("/api/auth", authRoutes);

// protected routes
app.use("/api/user", authenticate, userRoutes);
app.use("/api/sessions", authenticate, sessionRoutes);


app.use(errorHandler);

app.listen(port, () => {
  console.log("server is running on port : " + port);
  connectToDatabase()
});
