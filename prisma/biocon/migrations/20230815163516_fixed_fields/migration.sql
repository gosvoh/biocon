/*
  Warnings:

  - Made the column `howToKnow` on table `Registrations` required. This step will fail if there are existing NULL values in that column.
  - Made the column `country` on table `Speakers` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Registrations" ALTER COLUMN "howToKnow" SET NOT NULL,
ALTER COLUMN "howToKnow" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Speakers" ALTER COLUMN "country" SET NOT NULL,
ALTER COLUMN "country" DROP DEFAULT;
