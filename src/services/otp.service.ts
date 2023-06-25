import { Injectable } from '@nestjs/common';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class OtpService {
  private otp: number;

  constructor(private redis: RedisService) {}

  generateOtp() {
    this.otp = Math.floor(100000 + Math.random() * 900000);
  }

  deleteOtp() {
    this.otp = null;
  }

  verifyOtp() {}

  sendOtp() {}
}
