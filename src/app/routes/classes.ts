import express from "express";
import { createClass } from "../controllers/classes-controllers";

const router = express.Router();
router.post("/classes", createClass);

export default router;
