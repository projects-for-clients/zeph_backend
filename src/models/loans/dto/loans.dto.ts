import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class createDto {
  @IsString()
  @IsNotEmpty()
  borrower_name: string;

  @IsString()
  @IsNotEmpty()
  lender_name: string;
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
}
