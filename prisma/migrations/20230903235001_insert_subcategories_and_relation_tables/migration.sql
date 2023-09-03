-- AlterTable
ALTER TABLE "category" ADD COLUMN     "showInMenu" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "productSubCategory" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "subCategoryId" INTEGER NOT NULL,

    CONSTRAINT "productSubCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subCategory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "showInMenu" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "subCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categorySubCategory" (
    "id" SERIAL NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "subCategoryId" INTEGER NOT NULL,

    CONSTRAINT "categorySubCategory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "subCategory_name_key" ON "subCategory"("name");

-- AddForeignKey
ALTER TABLE "productSubCategory" ADD CONSTRAINT "productSubCategory_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "productSubCategory" ADD CONSTRAINT "productSubCategory_subCategoryId_fkey" FOREIGN KEY ("subCategoryId") REFERENCES "subCategory"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "categorySubCategory" ADD CONSTRAINT "categorySubCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "categorySubCategory" ADD CONSTRAINT "categorySubCategory_subCategoryId_fkey" FOREIGN KEY ("subCategoryId") REFERENCES "subCategory"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
