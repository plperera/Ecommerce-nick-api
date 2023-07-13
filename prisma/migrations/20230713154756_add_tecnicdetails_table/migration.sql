-- CreateTable
CREATE TABLE "tecnicDetails" (
    "id" SERIAL NOT NULL,
    "topic" TEXT NOT NULL,
    "topicDetail" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "tecnicDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_productTotecnicDetails" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_productTotecnicDetails_AB_unique" ON "_productTotecnicDetails"("A", "B");

-- CreateIndex
CREATE INDEX "_productTotecnicDetails_B_index" ON "_productTotecnicDetails"("B");

-- AddForeignKey
ALTER TABLE "_productTotecnicDetails" ADD CONSTRAINT "_productTotecnicDetails_A_fkey" FOREIGN KEY ("A") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_productTotecnicDetails" ADD CONSTRAINT "_productTotecnicDetails_B_fkey" FOREIGN KEY ("B") REFERENCES "tecnicDetails"("id") ON DELETE CASCADE ON UPDATE CASCADE;
