import { config } from "dotenv";
import "dotenv/config";
import { defineConfig } from "prisma/config";
config();

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: process.env["DATABASE_URL"],
  },
});
