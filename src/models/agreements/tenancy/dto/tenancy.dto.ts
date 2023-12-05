import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

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


export class UpdateTenancyTdo {

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
  paymentRefId: string;

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
  @IsNumber()
  @IsNotEmpty()
  amount: number;


  @IsOptional()
  @IsBoolean()
  isPaid: boolean;

}
