-- CreateTable
CREATE TABLE "contracts" (
    "id" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "type" VARCHAR(100) NOT NULL DEFAULT 'agreement',

    CONSTRAINT "contracts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "deed_of_assignments" (
    "id" SERIAL NOT NULL,
    "donor_name" VARCHAR(100) NOT NULL,
    "donor_address" VARCHAR(100) NOT NULL,
    "donee_name" VARCHAR(100) NOT NULL,
    "donee_address" VARCHAR(100) NOT NULL,
    "type" VARCHAR(100) NOT NULL DEFAULT 'agreement',
    "property_description" TEXT,
    "relevant_documents" TEXT[],
    "userId" INTEGER NOT NULL,

    CONSTRAINT "deed_of_assignments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "leases" (
    "id" SERIAL NOT NULL,
    "leasor_name" VARCHAR(100) NOT NULL,
    "leasee_name" VARCHAR(100) NOT NULL,
    "userId" INTEGER NOT NULL,
    "type" VARCHAR(100) NOT NULL DEFAULT 'agreement',

    CONSTRAINT "leases_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "loans" (
    "id" SERIAL NOT NULL,
    "borrower_name" VARCHAR(100) NOT NULL,
    "lender_name" VARCHAR(100) NOT NULL,
    "type" VARCHAR(100) NOT NULL DEFAULT 'agreement',
    "userId" INTEGER NOT NULL,

    CONSTRAINT "loans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "power_of_attorneys" (
    "id" SERIAL NOT NULL,
    "assignor_name" VARCHAR(100) NOT NULL,
    "assignor_address" VARCHAR(100) NOT NULL,
    "assignee_name" VARCHAR(100) NOT NULL,
    "assignee_address" VARCHAR(100) NOT NULL,
    "property_description" TEXT,
    "relevant_documents" TEXT[],
    "type" VARCHAR(100) NOT NULL DEFAULT 'agreement',
    "userId" INTEGER NOT NULL,

    CONSTRAINT "power_of_attorneys_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sales" (
    "id" SERIAL NOT NULL,
    "vendor_name" VARCHAR(100) NOT NULL,
    "purchaser_name" VARCHAR(100) NOT NULL,
    "property_description" TEXT,
    "amount" DECIMAL(10,2),
    "type" VARCHAR(100) NOT NULL DEFAULT 'agreement',
    "relevant_documents" TEXT[],
    "userId" INTEGER NOT NULL,

    CONSTRAINT "sales_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tenants" (
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
    "userId" INTEGER NOT NULL,

    CONSTRAINT "tenants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "password" VARCHAR(200) NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "contracts" ADD CONSTRAINT "contracts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "deed_of_assignments" ADD CONSTRAINT "deed_of_assignments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "leases" ADD CONSTRAINT "leases_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "loans" ADD CONSTRAINT "loans_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "power_of_attorneys" ADD CONSTRAINT "power_of_attorneys_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "sales" ADD CONSTRAINT "sales_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tenants" ADD CONSTRAINT "tenants_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
