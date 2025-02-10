import express from "express";
const app = express();

import dotenv from "dotenv";
dotenv.config({ path: "./config/.env" });

import cors from "cors";
app.use(
  cors({
    origin: [process.env.PORTFOLIO_URL, process.env.DASHBOARD_URL],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

import cookieParser from "cookie-parser";
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import fileUpload from "express-fileupload";
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/temp/",
  })
);

import databaseConnection from "./databases/database.js";
databaseConnection();

import messageRouter from "./router/messageRoute.js";
app.use("/api/contact/message", messageRouter);

import userRouter from "./router/userRoute.js";
app.use("/api/user", userRouter);

import timelineRouter from "./router/timelineRoute.js";
app.use("/api/timeline", timelineRouter);

import skillRouter from "./router/skillRoute.js";
app.use("/api/skill", skillRouter);

import projectRouter from "./router/projectRoute.js";
app.use("/api/project", projectRouter);

import { errorMiddleware } from "./middlewares/error.js";
app.use(errorMiddleware);

export default app;
