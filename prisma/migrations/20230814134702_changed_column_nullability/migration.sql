/*
  Warnings:

  - Made the column `nameUrl` on table `Speakers` required. This step will fail if there are existing NULL values in that column.
  - Made the column `speakerType` on table `Speakers` required. This step will fail if there are existing NULL values in that column.
  - Made the column `thunderUrl` on table `Speakers` required. This step will fail if there are existing NULL values in that column.
  - Made the column `universityUrl` on table `Speakers` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Speakers" ALTER COLUMN "nameUrl" SET NOT NULL,
ALTER COLUMN "speakerType" SET NOT NULL,
ALTER COLUMN "thunderUrl" SET NOT NULL,
ALTER COLUMN "universityUrl" SET NOT NULL;
