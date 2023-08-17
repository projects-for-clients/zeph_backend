/*
  Warnings:

  - You are about to drop the `account` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `contract` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `deed_of_assignment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `lease` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `loan` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `power_of_attorney` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sale` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tenancy` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('pending', 'approved');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('superAdmin', 'customer');

-- DropForeignKey
ALTER TABLE "public"."account" DROP CONSTRAINT "account_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."contract" DROP CONSTRAINT "contract_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."deed_of_assignment" DROP CONSTRAINT "deed_of_assignment_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."lease" DROP CONSTRAINT "lease_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."loan" DROP CONSTRAINT "loan_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."power_of_attorney" DROP CONSTRAINT "power_of_attorney_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."sale" DROP CONSTRAINT "sale_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."tenancy" DROP CONSTRAINT "tenancy_userId_fkey";

-- DropTable
DROP TABLE "public"."account";

-- DropTable
DROP TABLE "public"."contract";

-- DropTable
DROP TABLE "public"."deed_of_assignment";

-- DropTable
DROP TABLE "public"."lease";

-- DropTable
DROP TABLE "public"."loan";

-- DropTable
DROP TABLE "public"."power_of_attorney";

-- DropTable
DROP TABLE "public"."sale";

-- DropTable
DROP TABLE "public"."tenancy";

-- DropTable
DROP TABLE "public"."user";

-- DropEnum
DROP TYPE "public"."Status";

-- CreateTable
CREATE TABLE "contract" (
    "id" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "type" VARCHAR(100) NOT NULL DEFAULT 'agreement',
    "status" "Status" NOT NULL DEFAULT 'pending',

    CONSTRAINT "contract_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "deed_of_assignment" (
    "id" SERIAL NOT NULL,
    "donor_name" VARCHAR(100) NOT NULL,
    "donor_address" VARCHAR(100) NOT NULL,
    "donee_name" VARCHAR(100) NOT NULL,
    "donee_address" VARCHAR(100) NOT NULL,
    "type" VARCHAR(100) NOT NULL DEFAULT 'agreement',
    "property_description" TEXT,
    "relevant_documents" TEXT[],
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'pending',

    CONSTRAINT "deed_of_assignment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lease" (
    "id" SERIAL NOT NULL,
    "leasor_name" VARCHAR(100) NOT NULL,
    "leasee_name" VARCHAR(100) NOT NULL,
    "type" VARCHAR(100) NOT NULL DEFAULT 'agreement',
    "userId" INTEGER NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'pending',

    CONSTRAINT "lease_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "loan" (
    "id" SERIAL NOT NULL,
    "borrower_name" VARCHAR(100) NOT NULL,
    "lender_name" VARCHAR(100) NOT NULL,
    "type" VARCHAR(100) NOT NULL DEFAULT 'agreement',
    "userId" INTEGER NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'pending',

    CONSTRAINT "loan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "power_of_attorney" (
    "id" SERIAL NOT NULL,
    "assignor_name" VARCHAR(100) NOT NULL,
    "assignor_address" VARCHAR(100) NOT NULL,
    "assignee_name" VARCHAR(100) NOT NULL,
    "assignee_address" VARCHAR(100) NOT NULL,
    "property_description" TEXT,
    "relevant_documents" TEXT[],
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "type" VARCHAR(100) NOT NULL DEFAULT 'agreement',
    "userId" INTEGER NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'pending',

    CONSTRAINT "power_of_attorney_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sale" (
    "id" SERIAL NOT NULL,
    "vendor_name" VARCHAR(100) NOT NULL,
    "purchaser_name" VARCHAR(100) NOT NULL,
    "property_description" TEXT,
    "amount" DECIMAL(10,2),
    "type" VARCHAR(100) NOT NULL DEFAULT 'agreement',
    "relevant_documents" TEXT[],
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'pending',

    CONSTRAINT "sale_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tenancy" (
    "id" SERIAL NOT NULL,
    "landlord_name" VARCHAR(100) NOT NULL,
    "landlord_address" VARCHAR(100) NOT NULL,
    "tenant_name" VARCHAR(100) NOT NULL,
    "tenant_address" VARCHAR(100) NOT NULL,
    "property_description" TEXT,
    "type" VARCHAR(100) NOT NULL DEFAULT 'agreement',
    "amount" DECIMAL(10,2) NOT NULL,
    "duration" VARCHAR(100) NOT NULL,
    "relevant_documents" TEXT[],
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'pending',

    CONSTRAINT "tenancy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "hashedPassword" VARCHAR(200),
    "firstName" VARCHAR(200) NOT NULL,
    "lastName" VARCHAR(200) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'customer',

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "account" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT,
    "providerUserId" TEXT,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "account_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "account_provider_providerUserId_key" ON "account"("provider", "providerUserId");

-- AddForeignKey
ALTER TABLE "contract" ADD CONSTRAINT "contract_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "deed_of_assignment" ADD CONSTRAINT "deed_of_assignment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lease" ADD CONSTRAINT "lease_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "loan" ADD CONSTRAINT "loan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "power_of_attorney" ADD CONSTRAINT "power_of_attorney_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sale" ADD CONSTRAINT "sale_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tenancy" ADD CONSTRAINT "tenancy_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "account" ADD CONSTRAINT "account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
