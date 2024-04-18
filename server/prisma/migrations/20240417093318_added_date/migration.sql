/*
  Warnings:

  - Added the required column `date` to the `Expenditure` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Expenditure" ADD COLUMN     "date" INTEGER NOT NULL;
