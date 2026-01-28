import cors from "cors";
import express from "express";
import subjectsRouter from "./routes/subjects.js";

export const app = express();

app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

app.use("/api", subjectsRouter);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});
