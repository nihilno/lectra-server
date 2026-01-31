import express from "express";
import { createClass, getClasses } from "../controllers/classes-controllers";

const router = express.Router();
router.post("/classes", createClass);
router.get("/classes", getClasses);

export default router;
