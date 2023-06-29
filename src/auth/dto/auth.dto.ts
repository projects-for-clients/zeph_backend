import { IsEmail, IsString, IsNotEmpty, IsNumber, Length, MinLength } from 'class-validator';

export class AuthRegister {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}

export class AuthLogin {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class AuthVefifyOtp {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  password: string;
  
  @IsNumber()
  @IsNotEmpty()
  @Length(6)
  otp: number;
}
