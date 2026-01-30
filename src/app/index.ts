import cors from "cors";
import express from "express";
import { securityMiddleware } from "./middlewares/security.js";
import subjectsRouter from "./routes/subjects.js";

export const app = express();

app.use(express.json());
app.use(securityMiddleware);

if (!process.env.FRONTEND_URL) {
  throw new Error("FRONTEND_URL is not defined in environment variables");
}
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

app.use("/api", subjectsRouter);
