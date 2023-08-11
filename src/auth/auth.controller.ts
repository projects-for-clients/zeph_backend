import { AuthEmail, AuthLogin, AuthRegister, AuthOtp } from './dto';
import { AuthService } from './auth.service';
import { Body, Controller, Post, Res, Response } from '@nestjs/common';
import { Response as ExpressRes } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('email')
  authEmail(@Body() dto: AuthEmail) {
    return this.authService.authEmail(dto);
  }


  @Post('otp')
  authOtp(@Body() dto: AuthOtp) {
    const { otp } = dto

    if (otp.toString().length !== 6) {
      return 'OTP must be 6 digits long'
    }
    return this.authService.authOtp(dto);
  }

  @Post('register')
  authRegister( @Body() dto: AuthRegister, @Response() res: ExpressRes) {
   
    return this.authService.authRegister(dto, res);
  }

  @Post('login')
  login(@Body() dto: AuthLogin, @Response() res: ExpressRes) {
   
    return this.authService.login(dto, res);
  }
  @Post('logout')
  logout(@Response() res: ExpressRes) {
    return this.authService.logout(res);
  }
}
