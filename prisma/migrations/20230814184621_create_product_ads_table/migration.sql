/*
  Warnings:

  - You are about to drop the column `subTitle` on the `homeCategory` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "homeCategory" DROP COLUMN "subTitle";

-- CreateTable
CREATE TABLE "homeProductBanner" (
    "id" SERIAL NOT NULL,
    "imageId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "homeProductBanner_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "homeProductBanner" ADD CONSTRAINT "homeProductBanner_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "homeProductBanner" ADD CONSTRAINT "homeProductBanner_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "image"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
