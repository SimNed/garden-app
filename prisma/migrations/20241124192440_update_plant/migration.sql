/*
  Warnings:

  - You are about to alter the column `genusId` on the `Plant` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `plantCategoryId` on the `Plant` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - Added the required column `description` to the `Plant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageUrl` to the `Plant` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Plant" DROP CONSTRAINT "Plant_genusId_fkey";

-- DropForeignKey
ALTER TABLE "Plant" DROP CONSTRAINT "Plant_plantCategoryId_fkey";

-- AlterTable
ALTER TABLE "Plant" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "imageUrl" VARCHAR(255) NOT NULL,
ALTER COLUMN "genusId" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "plantCategoryId" SET DATA TYPE VARCHAR(255);

-- AddForeignKey
ALTER TABLE "Plant" ADD CONSTRAINT "Plant_genusId_fkey" FOREIGN KEY ("genusId") REFERENCES "Genus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Plant" ADD CONSTRAINT "Plant_plantCategoryId_fkey" FOREIGN KEY ("plantCategoryId") REFERENCES "PlantCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;
