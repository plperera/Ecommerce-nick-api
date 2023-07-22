-- CreateTable
CREATE TABLE "productFavorite" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "productFavorite_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "productFavorite" ADD CONSTRAINT "productFavorite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "productFavorite" ADD CONSTRAINT "productFavorite_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
