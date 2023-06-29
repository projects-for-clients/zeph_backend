import { AuthLogin, AuthRegister } from './dto';
import { AuthService } from './auth.service';
import { Body, Controller, Post, Res, Response } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('register')
  register(@Body() dto: AuthRegister, @Res({ passthrough: true }) res: any) {
    return this.authService.register(dto, res);
  }

  @Post('login')
  login(@Body() dto: AuthLogin, @Response() res: any) {
    return this.authService.login(dto, res);
  }
  @Post('logout')
  logout(@Response() res: any) {
    return this.authService.logout(res);
  }
}
