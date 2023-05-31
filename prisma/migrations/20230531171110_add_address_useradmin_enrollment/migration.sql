-- CreateTable
CREATE TABLE "enrollment" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "birthday" TIMESTAMP(3) NOT NULL,
    "phone" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "enrollment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "address" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "mainAddress" BOOLEAN NOT NULL DEFAULT true,
    "cep" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "addressDetail" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userAdmin" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "userAdmin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "enrollment_cpf_key" ON "enrollment"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "userAdmin_email_key" ON "userAdmin"("email");

-- AddForeignKey
ALTER TABLE "enrollment" ADD CONSTRAINT "enrollment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "address" ADD CONSTRAINT "address_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
