import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateUniversity {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  imageUrl: string;

  @IsNotEmpty()
  location: string;

  @IsNotEmpty()
  @IsNumber()
  majors: number;
}
