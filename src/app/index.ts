import { toNodeHandler } from "better-auth/node";
import cors from "cors";
import express from "express";
import { auth } from "../lib/auth.js";
import { securityMiddleware } from "./middlewares/security.js";
import classesRouter from "./routes/classes.js";
import subjectsRouter from "./routes/subjects.js";
import usersRouter from "./routes/users.js";

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

// Splat matches any route without the root route. It's a catch-all block.
app.all("/api/auth/{*splat}", toNodeHandler(auth));
app.use("/api", subjectsRouter);
app.use("/api", usersRouter);
app.use("/api", classesRouter);
