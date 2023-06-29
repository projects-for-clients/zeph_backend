import { EmailService } from 'src/services/email.service';
import { Injectable } from '@nestjs/common';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class OtpService {
  private otp: number;
  private email: string;

  constructor(private redis: RedisService, private emailService: EmailService) { }

  async generateOtp(email: string) {
    this.otp = Math.floor(100000 + Math.random() * 900000);
    await this.redis.set(`otp-${email}-${this.otp}`, this.otp, 60 * 5);
    this.email = email;
    
  }

  async deleteOtp() {
    this.otp = null;
    return await this.redis.del(`otp-${this.email}-${this.otp}`);
  }

  async verifyOtp(providedOtp: number) {
    await this.redis.get(`otp-${this.email}-${this.otp}`)
    
  }

  async sendOtp() {
    await this.emailService.sendOTP(this.email, this.otp);
    
  }
}
