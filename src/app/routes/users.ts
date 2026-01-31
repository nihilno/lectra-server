import express from "express";
import { prisma } from "../../lib/prisma";

const router = express.Router();

router.get("/users", async (req, res) => {
  try {
    const { search, role, page = 1, limit = 10 } = req.query;

    const currentPage = Math.max(1, parseInt(String(page), 10) || 1);
    const take = Math.min(Math.max(1, parseInt(String(limit), 10) || 10), 100);

    const skip = (currentPage - 1) * take;
    const filterConditions: any = {};

    if (search) {
      filterConditions.OR = [
        { name: { contains: String(search), mode: "insensitive" } },
        { email: { contains: String(search), mode: "insensitive" } },
      ];
    }

    if (role) {
      filterConditions.role = String(role);
    }

    const count = await prisma.user.count({ where: filterConditions });
    const users = await prisma.user.findMany({
      where: filterConditions,
      orderBy: { createdAt: "desc" },
      take,
      skip,
    });

    res.status(200).json({
      data: users,
      pagination: {
        page: currentPage,
        limit: take,
        total: count,
        totalPages: Math.ceil(count / take),
      },
    });
  } catch (error) {
    console.error("Error in /users route:", error);
    res.status(500).json({ error: "[ISE] Failed to get users." });
  }
});

export default router;
