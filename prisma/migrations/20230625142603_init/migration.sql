-- CreateTable
CREATE TABLE "contract_agreements" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "type" VARCHAR(100) NOT NULL DEFAULT 'agreements',

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
    "userId" INTEGER,

    CONSTRAINT "deed_of_assignments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lease_agreements" (
    "id" SERIAL NOT NULL,
    "leasor_name" VARCHAR(100) NOT NULL,
    "leasee_name" VARCHAR(100) NOT NULL,
    "agreement_id" INTEGER,
    "type" VARCHAR(100) NOT NULL,

    CONSTRAINT "lease_agreements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "loan_agreements" (
    "id" SERIAL NOT NULL,
    "borrower_name" VARCHAR(100) NOT NULL,
    "lender_name" VARCHAR(100) NOT NULL,
    "type" VARCHAR(100) NOT NULL DEFAULT 'agreements',
    "user_id" INTEGER,

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
    "userId" INTEGER,

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
    "userId" INTEGER,

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
    "userId" INTEGER,

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
ALTER TABLE "contract_agreements" ADD CONSTRAINT "contract_agreements_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "deed_of_assignments" ADD CONSTRAINT "deed_of_assignments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "power_of_attorneys" ADD CONSTRAINT "power_of_attorneys_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "sales_agreements" ADD CONSTRAINT "sales_agreements_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tenants" ADD CONSTRAINT "tenants_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
