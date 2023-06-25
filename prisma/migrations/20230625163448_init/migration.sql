/*
  Warnings:

  - You are about to drop the column `user_id` on the `contracts` table. All the data in the column will be lost.
  - Added the required column `userId` to the `contracts` table without a default value. This is not possible if the table is not empty.
  - Made the column `userId` on table `deed_of_assignments` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `leases` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `loans` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `power_of_attorneys` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `sales` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `tenants` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "contracts" DROP CONSTRAINT "contracts_user_id_fkey";

-- AlterTable
ALTER TABLE "contracts" DROP COLUMN "user_id",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "deed_of_assignments" ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "leases" ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "loans" ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "power_of_attorneys" ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "sales" ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "tenants" ALTER COLUMN "userId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "contracts" ADD CONSTRAINT "contracts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
