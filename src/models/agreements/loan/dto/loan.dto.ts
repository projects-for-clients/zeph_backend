import { IsString, IsNotEmpty, IsOptional, IsNumber, IsBoolean } from 'class-validator';

export class createDto {
  @IsString()
  @IsNotEmpty()
  borrower_name: string;

  @IsString()
  @IsNotEmpty()
  lender_name: string;

  @IsString()
  @IsNotEmpty()
  interestRate: number;

  @IsString()
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

  @IsString()
  @IsNotEmpty()
  interestRate: number;


  @IsOptional()
  @IsBoolean()
  isPaid: boolean;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  amount: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  paymentRefId: string;
}
