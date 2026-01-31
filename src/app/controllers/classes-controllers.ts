import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

async function createClass(req: Request, res: Response) {
  try {
    const createdClass = await prisma.class.create({
      data: {
        ...req.body,
        inviteCode: Math.random().toString(36).substring(2, 8).toUpperCase(),
        schedules: [],
      },
    });

    if (!createdClass) {
      return res.status(400).json({ message: "Failed to create class" });
    }

    res.status(201).json({ data: createdClass });
  } catch (error) {
    console.error("Error creating class:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export { createClass };
