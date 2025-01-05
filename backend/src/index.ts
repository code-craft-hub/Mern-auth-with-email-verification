import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import express from "express";
import connectToDatabase from "./config/db";
import cors from "cors";
import errorHandler from "./middleware/errorHandler";
import authRoutes from "./routes/auth.route";
import { APP_ORIGIN, PORT } from "./constants/env";

const port = PORT || 5001;
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: APP_ORIGIN,
    credentials: true,
  })
);


app.use("/auth", authRoutes);



app.use(errorHandler);

app.listen(port, () => {
  console.log("server is running on port : " + port);
  connectToDatabase()
});
