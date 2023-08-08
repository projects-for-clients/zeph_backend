import { AuthLogin, AuthRegister, AuthVefifyOtp } from './dto';
import { AuthService } from './auth.service';
import { Body, Controller, Post, Res, Response } from '@nestjs/common';
import { Response as ExpressRes } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('register')
  register(@Body() dto: AuthRegister) {
    return this.authService.register(dto);
  }
  @Post('verify')
  verify(@Body() dto: AuthVefifyOtp, @Res() res: ExpressRes) {
    const { otp } = dto

    if (otp.toString().length !== 6) {
      res.json('OTP must be 6 digits long')
    }
    return this.authService.verifyOtp(dto, res);
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
