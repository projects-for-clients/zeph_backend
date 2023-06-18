import { AuthLogin, AuthRegister } from 'src/auth/dto';
import { AuthService } from './auth.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() dto: AuthRegister) {
    return this.authService.register(dto);
  }

  @Post('login')
  login(@Body() dto: AuthLogin) {
    return this.authService.login(dto);
  }
}
