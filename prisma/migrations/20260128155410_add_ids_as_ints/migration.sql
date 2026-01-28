/*
  Warnings:

  - The primary key for the `departments` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `departments` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `subjects` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `subjects` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `departmentId` on the `subjects` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "subjects" DROP CONSTRAINT "subjects_departmentId_fkey";

-- AlterTable
ALTER TABLE "departments" DROP CONSTRAINT "departments_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "departments_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "subjects" DROP CONSTRAINT "subjects_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "departmentId",
ADD COLUMN     "departmentId" INTEGER NOT NULL,
ADD CONSTRAINT "subjects_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE INDEX "subjects_departmentId_idx" ON "subjects"("departmentId");

-- CreateIndex
CREATE UNIQUE INDEX "subjects_departmentId_code_key" ON "subjects"("departmentId", "code");

-- AddForeignKey
ALTER TABLE "subjects" ADD CONSTRAINT "subjects_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "departments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
