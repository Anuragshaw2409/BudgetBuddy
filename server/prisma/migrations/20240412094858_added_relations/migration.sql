/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `CustomTags` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `Expenditure` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `CustomTags` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Expenditure` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CustomTags" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Expenditure" ADD COLUMN     "userId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "CustomTags_userId_key" ON "CustomTags"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Expenditure_userId_key" ON "Expenditure"("userId");

-- AddForeignKey
ALTER TABLE "Expenditure" ADD CONSTRAINT "Expenditure_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomTags" ADD CONSTRAINT "CustomTags_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
