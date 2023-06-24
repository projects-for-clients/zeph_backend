import { AuthLogin, AuthRegister } from './dto';
import { AuthService } from './auth.service';
import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(
    @Body() dto: AuthRegister,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.register(dto, res);
  }

  @Post('login')
  login(
    @Body() dto: AuthLogin,
    @Res()
    res: Response,
  ) {
    return this.authService.login(dto, res);
  }
}
