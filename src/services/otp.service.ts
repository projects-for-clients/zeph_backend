import { Injectable } from '@nestjs/common';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class OtpService {
  private otp: number;

  constructor(private redis: RedisService, private providedOtp) {}

  generateOtp(email: string) {
    this.otp = Math.floor(100000 + Math.random() * 900000);
    this.redis.set(`email-${this.otp}`, this.otp);
    return this.otp;
  }

  deleteOtp() {
    this.otp = null;
    this.redis.del(`otp-${this.otp}`);
  }

  verifyOtp() {
    console.log('hello world');
  }

  sendOtp() {
    console.log('hellow o');
  }
}
