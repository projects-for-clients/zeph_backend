import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class TenantDto {
  @IsString()
  @IsNotEmpty()
  landlord_name: string;

  @IsString()
  @IsNotEmpty()
  landlord_address: string;

  @IsString()
  @IsNotEmpty()
  tenant_name: string;

  @IsString()
  @IsNotEmpty()
  tenant_address: string;

  @IsString()
  @IsNotEmpty()
  duration: string;

  @IsString()
  @IsNotEmpty()
  property_description: string;

  // @IsString()
  // relevant_documents: string;

  @IsString()
  @IsNotEmpty()
  amount: number;
}
