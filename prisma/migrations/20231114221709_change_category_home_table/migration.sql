/*
  Warnings:

  - You are about to drop the column `categoryId` on the `homeCategory` table. All the data in the column will be lost.
  - Added the required column `subCategoryId` to the `homeCategory` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "homeCategory" DROP CONSTRAINT "homeCategory_categoryId_fkey";

-- AlterTable
ALTER TABLE "homeCategory" DROP COLUMN "categoryId",
ADD COLUMN     "subCategoryId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "homeCategory" ADD CONSTRAINT "homeCategory_subCategoryId_fkey" FOREIGN KEY ("subCategoryId") REFERENCES "subCategory"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
