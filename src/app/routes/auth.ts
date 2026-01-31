import express from "express";

const router = express.Router();

router.post("/auth/login", (req, res) => {
  res.status(200).json({ message: "Logged in" });
});

router.post("/auth/register", (req, res) => {
  res.status(200).json({ message: "Registered" });
});
