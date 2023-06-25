import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

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
}
