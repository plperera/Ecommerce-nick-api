/*
  Warnings:

  - You are about to drop the `productCategory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "productCategory" DROP CONSTRAINT "productCategory_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "productCategory" DROP CONSTRAINT "productCategory_productId_fkey";

-- DropTable
DROP TABLE "productCategory";
