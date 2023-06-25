import { IsString, IsNotEmpty } from 'class-validator';

export class LeasesDto {
  @IsString()
  @IsNotEmpty()
  leasor_name: string;

  @IsString()
  @IsNotEmpty()
  leasee_name: string;
}
