-- AlterTable
ALTER TABLE "contract" ALTER COLUMN "paymentRefId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "deed_of_assignment" ALTER COLUMN "paymentRefId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "lease" ALTER COLUMN "paymentRefId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "loan" ALTER COLUMN "paymentRefId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "payment" ALTER COLUMN "paymentRefId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "power_of_attorney" ALTER COLUMN "paymentRefId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "sale" ALTER COLUMN "paymentRefId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "tenancy" ALTER COLUMN "paymentRefId" SET DATA TYPE TEXT;
