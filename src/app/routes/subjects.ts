import express from "express";
import { prisma } from "../../lib/prisma";

const router = express.Router();

router.get("/subjects", async (req, res) => {
  try {
    const { search, department, page = 1, limit = 10 } = req.query;

    const currentPage = Math.max(1, parseInt(String(page), 10) || 1);
    const take = Math.min(Math.max(1, parseInt(String(limit), 10) || 10), 100);

    const skip = (currentPage - 1) * take;
    const filterConditions: any = {};

    if (search) {
      filterConditions.OR = [
        { name: { contains: String(search), mode: "insensitive" } },
        { code: { contains: String(search), mode: "insensitive" } },
      ];
    }

    if (department) {
      filterConditions.department = {
        name: {
          contains: department,
          mode: "insensitive",
        },
      };
    }

    const count = await prisma.subject.count({ where: filterConditions });
    const subjects = await prisma.subject.findMany({
      where: filterConditions,
      include: { department: true },
      orderBy: { createdAt: "desc" },
      take,
      skip,
    });

    res.status(200).json({
      data: subjects,
      pagination: {
        page: currentPage,
        limit: take,
        total: count,
        totalPages: Math.ceil(count / take),
      },
    });
  } catch (error) {
    console.error("Error in /subjects route:", error);
    res.status(500).json({ error: "[ISE] Failed to get subjects." });
  }
});

export default router;
