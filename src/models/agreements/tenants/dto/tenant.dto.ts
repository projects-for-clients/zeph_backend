import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateDto {
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

  // @IsArray()
  // relevant_documents: string[];

  @IsString()
  @IsNotEmpty()
  amount: number;
}


export class UpdateTdo {

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  landlord_name: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  landlord_address: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  tenant_name: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  tenant_address: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  duration: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  property_description: string;

  // @IsArray()
  // relevant_documents: string[];

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  amount: number;
}
