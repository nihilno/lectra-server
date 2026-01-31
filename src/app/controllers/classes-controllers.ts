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

async function getClasses(req: Request, res: Response) {
  try {
    const { search, teacher, page = 1, limit = 10 } = req.query;

    const currentPage = Math.max(1, parseInt(String(page), 10) || 1);
    const take = Math.min(Math.max(1, parseInt(String(limit), 10) || 10), 100);

    const skip = (currentPage - 1) * take;
    const filterConditions: any = {};

    if (search) {
      filterConditions.OR = [
        { name: { contains: String(search), mode: "insensitive" } },
        { inviteCode: { contains: String(search), mode: "insensitive" } },
        {
          teacher: { name: { contains: String(search), mode: "insensitive" } },
        },
      ];
    }

    if (teacher) {
      filterConditions.teacherId = String(teacher);
    }

    const count = await prisma.class.count({ where: filterConditions });
    const classes = await prisma.class.findMany({
      where: filterConditions,
      include: { teacher: true, subject: true },
      orderBy: { createdAt: "desc" },
      take,
      skip,
    });

    res.status(200).json({
      data: classes,
      pagination: {
        page: currentPage,
        limit: take,
        total: count,
        totalPages: Math.ceil(count / take),
      },
    });
  } catch (error) {
    console.error("Error in /classes route:", error);
    res.status(500).json({ error: "[ISE] Failed to get classes." });
  }
}

export { createClass, getClasses };
