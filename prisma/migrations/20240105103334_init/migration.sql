/*
  Warnings:

  - The values [pending,approved] on the enum `Status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Status_new" AS ENUM ('PENDING_APPROVAL', 'PENDING_PAYMENT', 'PAID', 'DECLINED');
ALTER TABLE "contract" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "lease" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "power_of_attorney" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "deed_of_assignment" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "sale" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "tenancy" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "loan" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "contract" ALTER COLUMN "status" TYPE "Status_new" USING ("status"::text::"Status_new");
ALTER TABLE "deed_of_assignment" ALTER COLUMN "status" TYPE "Status_new" USING ("status"::text::"Status_new");
ALTER TABLE "lease" ALTER COLUMN "status" TYPE "Status_new" USING ("status"::text::"Status_new");
ALTER TABLE "loan" ALTER COLUMN "status" TYPE "Status_new" USING ("status"::text::"Status_new");
ALTER TABLE "power_of_attorney" ALTER COLUMN "status" TYPE "Status_new" USING ("status"::text::"Status_new");
ALTER TABLE "sale" ALTER COLUMN "status" TYPE "Status_new" USING ("status"::text::"Status_new");
ALTER TABLE "tenancy" ALTER COLUMN "status" TYPE "Status_new" USING ("status"::text::"Status_new");
ALTER TYPE "Status" RENAME TO "Status_old";
ALTER TYPE "Status_new" RENAME TO "Status";
DROP TYPE "Status_old";
ALTER TABLE "contract" ALTER COLUMN "status" SET DEFAULT 'PENDING_PAYMENT';
ALTER TABLE "lease" ALTER COLUMN "status" SET DEFAULT 'PENDING_PAYMENT';
ALTER TABLE "power_of_attorney" ALTER COLUMN "status" SET DEFAULT 'PENDING_PAYMENT';
ALTER TABLE "deed_of_assignment" ALTER COLUMN "status" SET DEFAULT 'PENDING_PAYMENT';
ALTER TABLE "sale" ALTER COLUMN "status" SET DEFAULT 'PENDING_PAYMENT';
ALTER TABLE "tenancy" ALTER COLUMN "status" SET DEFAULT 'PENDING_PAYMENT';
ALTER TABLE "loan" ALTER COLUMN "status" SET DEFAULT 'PENDING_PAYMENT';
COMMIT;

-- AlterTable
ALTER TABLE "contract" ALTER COLUMN "status" SET DEFAULT 'PENDING_PAYMENT';

-- AlterTable
ALTER TABLE "deed_of_assignment" ALTER COLUMN "status" SET DEFAULT 'PENDING_PAYMENT';

-- AlterTable
ALTER TABLE "lease" ALTER COLUMN "status" SET DEFAULT 'PENDING_PAYMENT';

-- AlterTable
ALTER TABLE "loan" ALTER COLUMN "status" SET DEFAULT 'PENDING_PAYMENT';

-- AlterTable
ALTER TABLE "power_of_attorney" ALTER COLUMN "status" SET DEFAULT 'PENDING_PAYMENT';

-- AlterTable
ALTER TABLE "sale" ALTER COLUMN "status" SET DEFAULT 'PENDING_PAYMENT';

-- AlterTable
ALTER TABLE "tenancy" ALTER COLUMN "status" SET DEFAULT 'PENDING_PAYMENT';
