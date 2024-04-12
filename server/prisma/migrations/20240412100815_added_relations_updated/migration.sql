/*
  Warnings:

  - Added the required column `tagIcon` to the `CustomTags` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tagName` to the `CustomTags` table without a default value. This is not possible if the table is not empty.
  - Added the required column `amount` to the `Expenditure` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `Expenditure` table without a default value. This is not possible if the table is not empty.
  - Added the required column `month` to the `Expenditure` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tagIcon` to the `Expenditure` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tagName` to the `Expenditure` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time` to the `Expenditure` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `Expenditure` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CustomTags" ADD COLUMN     "tagIcon" TEXT NOT NULL,
ADD COLUMN     "tagName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Expenditure" ADD COLUMN     "amount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "date" INTEGER NOT NULL,
ADD COLUMN     "month" INTEGER NOT NULL,
ADD COLUMN     "tagIcon" TEXT NOT NULL,
ADD COLUMN     "tagName" TEXT NOT NULL,
ADD COLUMN     "time" INTEGER NOT NULL,
ADD COLUMN     "year" INTEGER NOT NULL;
