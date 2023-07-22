-- CreateTable
CREATE TABLE "banner" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "imageId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "banner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "homeCategory" (
    "id" SERIAL NOT NULL,
    "subTitle" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "imageId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "homeCategory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "banner" ADD CONSTRAINT "banner_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "image"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "homeCategory" ADD CONSTRAINT "homeCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "homeCategory" ADD CONSTRAINT "homeCategory_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "image"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
