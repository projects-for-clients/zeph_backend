import { AuthLogin, AuthRegister } from './dto';
import { AuthService } from './auth.service';
import { Body, Controller, Headers, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() dto: AuthRegister) {
    return this.authService.register(dto);
  }

  @Post('login')
  login(@Headers() headers, @Body() dto: AuthLogin) {
    console.log(headers);
    return this.authService.login(dto);
  }
}
