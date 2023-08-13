/*
  Warnings:

  - Made the column `thunder` on table `Speakers` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Speakers" ALTER COLUMN "topic" DROP NOT NULL,
ALTER COLUMN "thunder" SET NOT NULL;
