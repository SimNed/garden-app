-- CreateTable
CREATE TABLE "Plant" (
    "id" TEXT NOT NULL,
    "taxonomicName" VARCHAR(255) NOT NULL,
    "commonName" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Plant_pkey" PRIMARY KEY ("id")
);
