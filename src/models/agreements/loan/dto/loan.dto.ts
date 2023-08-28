import { IsString, IsNotEmpty, IsOptional, isNumber, IsNumber, IsDecimal } from 'class-validator';

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

  @IsDecimal()
  @IsNotEmpty()
  amount: number;
}
