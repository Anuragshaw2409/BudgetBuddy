/*
  Warnings:

  - Added the required column `month` to the `Expenditure` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `Expenditure` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Expenditure" ADD COLUMN     "month" INTEGER NOT NULL,
ADD COLUMN     "year" INTEGER NOT NULL;
