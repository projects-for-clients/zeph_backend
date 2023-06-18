import {
  pgTable,
  serial,
  varchar,
  timestamp,
  text,
  integer,
} from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey().notNull(),
  firstname: varchar('firstname', { length: 50 }).notNull(),
  lastname: varchar('lastname', { length: 50 }).notNull(),
  password: varchar('password', { length: 50 }).notNull(),
  createdAt: timestamp('created_at', { mode: 'string' }).defaultNow(),
});

export const agreements = pgTable('agreements', {
  id: serial('id').primaryKey().notNull(),
  createdAt: timestamp('created_at', { mode: 'string' }).defaultNow(),
});

export const tenancy = pgTable('tenancy', {
  id: serial('id').primaryKey().notNull(),
  landlord_name: varchar('landlord_name', { length: 100 }).notNull(),
  landlord_address: varchar('landlord_address', { length: 100 }).notNull(),
  tenant_name: varchar('tenant_name', { length: 100 }).notNull(),
  tenant_address: varchar('tenant_address', { length: 100 }).notNull(),
  property_description: text('property_description'),
  relevant_documents: text('relevant_documents'),
  agreement_id: integer('agreement_id').references(() => agreements.id, {
    onDelete: 'cascade',
  }),
});

export const deed_of_assignment = pgTable('deed_of_assignment', {
  id: serial('id').primaryKey().notNull(),
  donor_name: varchar('donor_name', { length: 100 }).notNull(),
  donor_address: varchar('donor_address', { length: 100 }).notNull(),
  donee_name: varchar('donee_name', { length: 100 }).notNull(),
  donee_address: varchar('donee_address', { length: 100 }).notNull(),
  property_description: text('property_description'),
  relevant_documents: text('relevant_documents'),
  agreement_id: integer('agreement_id').references(() => agreements.id, {
    onDelete: 'cascade',
  }),
});

export const power_of_attorney = pgTable('power_of_attorney', {
  id: serial('id').primaryKey().notNull(),
  assignor_name: varchar('assignor_name', { length: 100 }).notNull(),
  assignor_address: varchar('assignor_address', { length: 100 }).notNull(),
  assignee_name: varchar('assignee_name', { length: 100 }).notNull(),
  assignee_address: varchar('assignee_address', { length: 100 }).notNull(),
  property_description: text('property_description'),
  relevant_documents: text('relevant_documents'),
  agreement_id: integer('agreement_id').references(() => agreements.id, {
    onDelete: 'cascade',
  }),
});

export const sales_agreement = pgTable('sales_agreement', {
  id: serial('id').primaryKey().notNull(),
  vendor_name: varchar('vendor_name', { length: 100 }).notNull(),
  purchaser_name: varchar('purchaser_name', { length: 100 }).notNull(),
  property_description: text('property_description'),
  amount: integer('amount'),
  relevant_documents: text('relevant_documents'),
  agreement_id: integer('agreement_id').references(() => agreements.id, {
    onDelete: 'cascade',
  }),
});

export const loan_agreement = pgTable('loan_agreement', {
  id: serial('id').primaryKey().notNull(),
  borrower_name: varchar('borrower_name', { length: 100 }).notNull(),
  lender_name: varchar('lender_name', { length: 100 }).notNull(),
  agreement_id: integer('agreement_id').references(() => agreements.id, {
    onDelete: 'cascade',
  }),
});

export const lease_agreement = pgTable('lease_agreement', {
  id: serial('id').primaryKey().notNull(),
  leasor_name: varchar('leasor_name', { length: 100 }).notNull(),
  leasee_name: varchar('leasee_name', { length: 100 }).notNull(),
  agreement_id: integer('agreement_id').references(() => agreements.id, {
    onDelete: 'cascade',
  }),
});
