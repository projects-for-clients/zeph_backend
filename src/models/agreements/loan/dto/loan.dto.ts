import { IsString, IsNotEmpty, IsOptional, isNumber, IsNumber, IsDecimal, IsBoolean } from 'class-validator';

export class createDto {
  @IsString()
  @IsNotEmpty()
  borrower_name: string;

  @IsString()
  @IsNotEmpty()
  lender_name: string;

  @IsNumber()
  @IsNotEmpty()
  interestRate: number;

  @IsDecimal()
  @IsNotEmpty()
  amount: number;
}

export class updateDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  borrower_name: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  lender_name: string;

  @IsNumber()
  @IsNotEmpty()
  interestRate: number;


  @IsOptional()
  @IsBoolean()
  isPaid: boolean;

  @IsOptional()
  @IsDecimal()
  @IsNotEmpty()
  amount: string;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  paymentRefId: number;
}
