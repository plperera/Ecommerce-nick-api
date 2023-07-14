/*
  Warnings:

  - Added the required column `imageName` to the `image` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "image" ADD COLUMN     "imageName" TEXT NOT NULL;
