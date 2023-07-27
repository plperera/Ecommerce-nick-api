/*
  Warnings:

  - Added the required column `shippingPrice` to the `order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "order" ADD COLUMN     "shippingPrice" INTEGER NOT NULL;
