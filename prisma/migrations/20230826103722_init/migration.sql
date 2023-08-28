/*
  Warnings:

  - You are about to drop the column `donee_address` on the `deed_of_assignment` table. All the data in the column will be lost.
  - You are about to drop the column `donee_name` on the `deed_of_assignment` table. All the data in the column will be lost.
  - You are about to drop the column `donor_address` on the `deed_of_assignment` table. All the data in the column will be lost.
  - You are about to drop the column `donor_name` on the `deed_of_assignment` table. All the data in the column will be lost.
  - You are about to drop the column `assignee_address` on the `power_of_attorney` table. All the data in the column will be lost.
  - You are about to drop the column `assignee_name` on the `power_of_attorney` table. All the data in the column will be lost.
  - You are about to drop the column `assignor_address` on the `power_of_attorney` table. All the data in the column will be lost.
  - You are about to drop the column `assignor_name` on the `power_of_attorney` table. All the data in the column will be lost.
  - Added the required column `assignee_address` to the `deed_of_assignment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `assignee_name` to the `deed_of_assignment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `assignor_address` to the `deed_of_assignment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `assignor_name` to the `deed_of_assignment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `lease` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `loan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `donee_address` to the `power_of_attorney` table without a default value. This is not possible if the table is not empty.
  - Added the required column `donee_name` to the `power_of_attorney` table without a default value. This is not possible if the table is not empty.
  - Added the required column `donor_address` to the `power_of_attorney` table without a default value. This is not possible if the table is not empty.
  - Added the required column `donor_name` to the `power_of_attorney` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "modelType" AS ENUM ('contract', 'deed_of_assignment', 'lease', 'power_of_attorney', 'loan', 'sale', 'tenancy');

-- AlterTable
ALTER TABLE "account" ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "contract" ADD COLUMN     "amount" DECIMAL(65,30),
ADD COLUMN     "isPaid" BOOLEAN,
ADD COLUMN     "paymentRefId" INTEGER;

-- AlterTable
ALTER TABLE "deed_of_assignment" DROP COLUMN "donee_address",
DROP COLUMN "donee_name",
DROP COLUMN "donor_address",
DROP COLUMN "donor_name",
ADD COLUMN     "amount" DECIMAL(65,30),
ADD COLUMN     "assignee_address" VARCHAR(100) NOT NULL,
ADD COLUMN     "assignee_name" VARCHAR(100) NOT NULL,
ADD COLUMN     "assignor_address" VARCHAR(100) NOT NULL,
ADD COLUMN     "assignor_name" VARCHAR(100) NOT NULL,
ADD COLUMN     "isPaid" BOOLEAN,
ADD COLUMN     "paymentRefId" INTEGER,
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "lease" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "isPaid" BOOLEAN,
ADD COLUMN     "paymentRefId" INTEGER,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "amount" DROP NOT NULL,
ALTER COLUMN "amount" SET DATA TYPE DECIMAL(65,30);

-- AlterTable
ALTER TABLE "loan" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "duration" TEXT,
ADD COLUMN     "isPaid" BOOLEAN,
ADD COLUMN     "paymentRefId" INTEGER,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "amount" DROP NOT NULL;

-- AlterTable
ALTER TABLE "power_of_attorney" DROP COLUMN "assignee_address",
DROP COLUMN "assignee_name",
DROP COLUMN "assignor_address",
DROP COLUMN "assignor_name",
ADD COLUMN     "amount" DECIMAL(65,30),
ADD COLUMN     "donee_address" VARCHAR(100) NOT NULL,
ADD COLUMN     "donee_name" VARCHAR(100) NOT NULL,
ADD COLUMN     "donor_address" VARCHAR(100) NOT NULL,
ADD COLUMN     "donor_name" VARCHAR(100) NOT NULL,
ADD COLUMN     "isPaid" BOOLEAN,
ADD COLUMN     "paymentRefId" INTEGER,
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "sale" ADD COLUMN     "isPaid" BOOLEAN,
ADD COLUMN     "paymentRefId" INTEGER,
ALTER COLUMN "amount" SET DEFAULT 0,
ALTER COLUMN "amount" SET DATA TYPE DECIMAL(65,30),
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "tenancy" ADD COLUMN     "isPaid" BOOLEAN,
ADD COLUMN     "paymentRefId" INTEGER,
ALTER COLUMN "amount" DROP NOT NULL,
ALTER COLUMN "amount" SET DEFAULT 0,
ALTER COLUMN "amount" SET DATA TYPE DECIMAL(65,30),
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMP(3);

-- CreateTable
CREATE TABLE "payment" (
    "id" TEXT NOT NULL,
    "model" "modelType" NOT NULL,
    "modelId" INTEGER NOT NULL,
    "paymentRefId" INTEGER NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "userId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "payment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "payment" ADD CONSTRAINT "payment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
