import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class TenantDto {
  @IsString()
  @IsNotEmpty()
  landlord_name: string;
  landlord_address: string;
  tenant_name: string;
  tenant_address: string;
  duration: string;
  property_description: string;
  relevant_documents: string;

  @IsString()
  @IsNotEmpty()
  amount: string;
}
