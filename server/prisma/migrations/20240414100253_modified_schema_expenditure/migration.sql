/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Expenditure` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `Expenditure` table. All the data in the column will be lost.
  - The `time` column on the `Expenditure` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Expenditure" DROP COLUMN "createdAt",
DROP COLUMN "date",
DROP COLUMN "time",
ADD COLUMN     "time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
