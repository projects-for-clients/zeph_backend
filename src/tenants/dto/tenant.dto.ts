

import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

landlord_name: varchar('landlord_name', { length: 100 }).notNull(),
  landlord_address: varchar('landlord_address', { length: 100 }).notNull(),
  tenant_name: varchar('tenant_name', { length: 100 }).notNull(),
  tenant_address: varchar('tenant_address', { length: 100 }).notNull(),
  property_description: text('property_description'),
  relevant_documents: text('relevant_documents'),
  agreement_id: integer('agreement_id').references(() => agreements.id, {
    onDelete: 'cascade',
  }),

export class TenantDto {
  @IsString()
  @IsNotEmpty()
  lastName: string;
}

