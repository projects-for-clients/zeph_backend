import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, IsNumber } from 'class-validator';

export class createDto {
  @IsString()
  @IsNotEmpty()
  leasor_name: string;

  @IsString()
  @IsNotEmpty()
  leasee_name: string;
}

export class updateDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  leasor_name: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  leasee_name: string;


  @IsOptional()
  @IsBoolean()
  isPaid: boolean;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  amount: string;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  paymentRefId: number;
}
