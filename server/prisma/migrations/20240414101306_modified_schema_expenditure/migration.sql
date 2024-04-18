/*
  Warnings:

  - You are about to drop the column `month` on the `Expenditure` table. All the data in the column will be lost.
  - You are about to drop the column `year` on the `Expenditure` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Expenditure" DROP COLUMN "month",
DROP COLUMN "year";
