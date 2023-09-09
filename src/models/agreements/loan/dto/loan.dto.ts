import { IsString, IsNotEmpty, IsOptional, IsNumber, IsNumber, IsNumber, IsBoolean } from 'class-validator';

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

  @IsNumber()
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
  @IsNumber()
  @IsNotEmpty()
  amount: string;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  paymentRefId: number;
}
