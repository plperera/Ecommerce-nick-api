/*
  Warnings:

  - You are about to drop the `_productTotecnicDetails` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_productTotecnicDetails" DROP CONSTRAINT "_productTotecnicDetails_A_fkey";

-- DropForeignKey
ALTER TABLE "_productTotecnicDetails" DROP CONSTRAINT "_productTotecnicDetails_B_fkey";

-- DropTable
DROP TABLE "_productTotecnicDetails";

-- AddForeignKey
ALTER TABLE "tecnicDetails" ADD CONSTRAINT "tecnicDetails_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
