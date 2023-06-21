/*
  Warnings:

  - You are about to drop the column `firstname` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `lastname` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `contract_agreement` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `deed_of_assignment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `lease_agreement` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `loan_agreement` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `power_of_attorney` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sales_agreement` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tenancy` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `email` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "contract_agreement" DROP CONSTRAINT "contract_agreement_agreement_id_fkey";

-- DropForeignKey
ALTER TABLE "deed_of_assignment" DROP CONSTRAINT "deed_of_assignment_agreement_id_fkey";

-- DropForeignKey
ALTER TABLE "lease_agreement" DROP CONSTRAINT "lease_agreement_agreement_id_fkey";

-- DropForeignKey
ALTER TABLE "loan_agreement" DROP CONSTRAINT "loan_agreement_agreement_id_fkey";

-- DropForeignKey
ALTER TABLE "power_of_attorney" DROP CONSTRAINT "power_of_attorney_agreement_id_fkey";

-- DropForeignKey
ALTER TABLE "sales_agreement" DROP CONSTRAINT "sales_agreement_agreement_id_fkey";

-- DropForeignKey
ALTER TABLE "tenancy" DROP CONSTRAINT "tenancy_agreement_id_fkey";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "firstname",
DROP COLUMN "lastname",
ADD COLUMN     "email" VARCHAR(50) NOT NULL;

-- DropTable
DROP TABLE "contract_agreement";

-- DropTable
DROP TABLE "deed_of_assignment";

-- DropTable
DROP TABLE "lease_agreement";

-- DropTable
DROP TABLE "loan_agreement";

-- DropTable
DROP TABLE "power_of_attorney";

-- DropTable
DROP TABLE "sales_agreement";

-- DropTable
DROP TABLE "tenancy";

-- CreateTable
CREATE TABLE "contract_agreements" (
    "id" SERIAL NOT NULL,
    "agreement_id" INTEGER,

    CONSTRAINT "contract_agreements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "deed_of_assignments" (
    "id" SERIAL NOT NULL,
    "donor_name" VARCHAR(100) NOT NULL,
    "donor_address" VARCHAR(100) NOT NULL,
    "donee_name" VARCHAR(100) NOT NULL,
    "donee_address" VARCHAR(100) NOT NULL,
    "property_description" TEXT,
    "relevant_documents" TEXT,
    "agreement_id" INTEGER,

    CONSTRAINT "deed_of_assignments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lease_agreements" (
    "id" SERIAL NOT NULL,
    "leasor_name" VARCHAR(100) NOT NULL,
    "leasee_name" VARCHAR(100) NOT NULL,
    "agreement_id" INTEGER,

    CONSTRAINT "lease_agreements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "loan_agreements" (
    "id" SERIAL NOT NULL,
    "borrower_name" VARCHAR(100) NOT NULL,
    "lender_name" VARCHAR(100) NOT NULL,
    "agreement_id" INTEGER,

    CONSTRAINT "loan_agreements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "power_of_attorneys" (
    "id" SERIAL NOT NULL,
    "assignor_name" VARCHAR(100) NOT NULL,
    "assignor_address" VARCHAR(100) NOT NULL,
    "assignee_name" VARCHAR(100) NOT NULL,
    "assignee_address" VARCHAR(100) NOT NULL,
    "property_description" TEXT,
    "relevant_documents" TEXT,
    "agreement_id" INTEGER,

    CONSTRAINT "power_of_attorneys_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sales_agreements" (
    "id" SERIAL NOT NULL,
    "vendor_name" VARCHAR(100) NOT NULL,
    "purchaser_name" VARCHAR(100) NOT NULL,
    "property_description" TEXT,
    "amount" DECIMAL(10,2),
    "relevant_documents" TEXT,
    "agreement_id" INTEGER,

    CONSTRAINT "sales_agreements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tenants" (
    "id" SERIAL NOT NULL,
    "landlord_name" VARCHAR(100) NOT NULL,
    "landlord_address" VARCHAR(100) NOT NULL,
    "tenant_name" VARCHAR(100) NOT NULL,
    "tenant_address" VARCHAR(100) NOT NULL,
    "property_description" TEXT,
    "amount" DECIMAL(10,2),
    "duration" VARCHAR(100) NOT NULL,
    "relevant_documents" TEXT,
    "agreement_id" INTEGER,

    CONSTRAINT "tenants_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "contract_agreements" ADD CONSTRAINT "contract_agreements_agreement_id_fkey" FOREIGN KEY ("agreement_id") REFERENCES "agreements"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "deed_of_assignments" ADD CONSTRAINT "deed_of_assignments_agreement_id_fkey" FOREIGN KEY ("agreement_id") REFERENCES "agreements"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "lease_agreements" ADD CONSTRAINT "lease_agreements_agreement_id_fkey" FOREIGN KEY ("agreement_id") REFERENCES "agreements"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "loan_agreements" ADD CONSTRAINT "loan_agreements_agreement_id_fkey" FOREIGN KEY ("agreement_id") REFERENCES "agreements"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "power_of_attorneys" ADD CONSTRAINT "power_of_attorneys_agreement_id_fkey" FOREIGN KEY ("agreement_id") REFERENCES "agreements"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "sales_agreements" ADD CONSTRAINT "sales_agreements_agreement_id_fkey" FOREIGN KEY ("agreement_id") REFERENCES "agreements"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tenants" ADD CONSTRAINT "tenants_agreement_id_fkey" FOREIGN KEY ("agreement_id") REFERENCES "agreements"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
