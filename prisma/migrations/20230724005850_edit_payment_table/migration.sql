/*
  Warnings:

  - You are about to drop the column `status` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `totalPrice` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `amount` on the `payment` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `payment` table. All the data in the column will be lost.
  - Added the required column `expirationMonth` to the `payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expirationYear` to the `payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstSixDigits` to the `payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idempotency` to the `payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `installments` to the `payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `issuerId` to the `payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastFourDigits` to the `payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payerDocumentNumber` to the `payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payerDocumentType` to the `payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payerEmail` to the `payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentId` to the `payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentStatus` to the `payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentStatusDetails` to the `payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentType` to the `payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transactionAmount` to the `payment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "order" DROP COLUMN "status",
DROP COLUMN "totalPrice";

-- AlterTable
ALTER TABLE "payment" DROP COLUMN "amount",
DROP COLUMN "status",
ADD COLUMN     "expirationMonth" INTEGER NOT NULL,
ADD COLUMN     "expirationYear" INTEGER NOT NULL,
ADD COLUMN     "firstSixDigits" TEXT NOT NULL,
ADD COLUMN     "idempotency" TEXT NOT NULL,
ADD COLUMN     "installments" INTEGER NOT NULL,
ADD COLUMN     "issuerId" TEXT NOT NULL,
ADD COLUMN     "lastFourDigits" TEXT NOT NULL,
ADD COLUMN     "payerDocumentNumber" TEXT NOT NULL,
ADD COLUMN     "payerDocumentType" TEXT NOT NULL,
ADD COLUMN     "payerEmail" TEXT NOT NULL,
ADD COLUMN     "paymentId" INTEGER NOT NULL,
ADD COLUMN     "paymentStatus" TEXT NOT NULL,
ADD COLUMN     "paymentStatusDetails" TEXT NOT NULL,
ADD COLUMN     "paymentType" TEXT NOT NULL,
ADD COLUMN     "transactionAmount" INTEGER NOT NULL;
