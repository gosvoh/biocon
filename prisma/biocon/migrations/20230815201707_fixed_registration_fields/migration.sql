/*
  Warnings:

  - You are about to drop the column `otherRole` on the `Registrations` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Registrations" DROP COLUMN "otherRole",
ADD COLUMN     "clothingSize" TEXT NOT NULL DEFAULT 'M';
