/*
  Warnings:

  - Added the required column `hIndex` to the `Speakers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Speakers" ADD COLUMN     "hIndex" INTEGER NOT NULL;
