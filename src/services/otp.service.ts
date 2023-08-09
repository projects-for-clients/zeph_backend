import { EmailService } from 'src/services/email.service';
import { Injectable } from '@nestjs/common';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class OtpService {


  constructor(private redis: RedisService, private emailService: EmailService) { }

  async generateOtp(email: string) {
    const scan = await this.redis.scan(`otp-${email}-`)

    console.log({scan})

    const getAll = await this.redis.getAll()

    console.log({getAll})

    const otp = Math.floor(100000 + Math.random() * 900000);
    await this.redis.set(`otp-${email}-${otp}`, otp, 60 * 5);

    return this.sendOtp(email, otp)
  }

  private async deleteOtp(email: string, otp: number) {

    return await this.redis.del(`otp-${email}-${otp}`);
  }

  async verifyOtp(email: string, otp: number) {
    const get: string = await this.redis.get(`otp-${email}-${otp}`)

    if (Number(get) === otp) {
      await this.deleteOtp(email, otp);
      return true;
    }

    return false;
  }

  private async sendOtp(email: string, otp: number) {
    const send = await this.emailService.sendOTP(email, otp);

    if (!send) {
      await this.deleteOtp(email, otp);
    }

    return send
  }
}
