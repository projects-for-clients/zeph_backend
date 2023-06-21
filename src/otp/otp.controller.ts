import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { OtpService } from './otp.service';

@Controller('verifyOtp')
export class OtpController {
  constructor(private readonly otpService: OtpService) {}

  @Post()
  create(@Body() createOtpDto: string) {
    return this.otpService.create(createOtpDto);
  }

  @Get()
  findAll() {
    return this.otpService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.otpService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.otpService.remove(+id);
  }
}
