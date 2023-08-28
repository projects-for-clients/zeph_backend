/*
  Warnings:

  - Made the column `isPaid` on table `deed_of_assignment` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "deed_of_assignment" ALTER COLUMN "isPaid" SET NOT NULL;
