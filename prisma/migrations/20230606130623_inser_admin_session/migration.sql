-- CreateTable
CREATE TABLE "sessionAdmin" (
    "id" SERIAL NOT NULL,
    "userAdminId" INTEGER NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "sessionAdmin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "sessionAdmin_token_key" ON "sessionAdmin"("token");

-- AddForeignKey
ALTER TABLE "sessionAdmin" ADD CONSTRAINT "sessionAdmin_userAdminId_fkey" FOREIGN KEY ("userAdminId") REFERENCES "userAdmin"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
