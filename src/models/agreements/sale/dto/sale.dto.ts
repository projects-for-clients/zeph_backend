import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateDto {
  @IsString()
  @IsNotEmpty()
  vendor_name: string;

  @IsString()
  @IsNotEmpty()
  purchaser_name: string;

  @IsString()
  @IsNotEmpty()
  property_description: string;

  @IsString()
  @IsNotEmpty()
  amount: number;
}


export class UpdateTdo {

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  vendor_name: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  purchaser_name: string;


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
