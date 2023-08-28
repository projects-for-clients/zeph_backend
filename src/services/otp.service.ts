import { Injectable } from '@nestjs/common';
import { RedisService } from 'src/redis/redis.service';
import { CreateEmailResponse } from 'resend/build/src/emails/interfaces';
import { OTP_TIME } from 'src/constants';
import { EmailService } from 'src/modules/Email.Service';

@Injectable()
export class OtpService {


  constructor(private redis: RedisService, private emailService: EmailService) { }

  async generateOtp(email: string): Promise<CreateEmailResponse> {
    const scan = await this.redis.scan(`otp-${email}-*`)

    if(scan.length > 0){
      const value = scan[0]

      const regexPattern = /\d{6}$/
      const otp = value.match(regexPattern)[0]

      return this.sendOtp(email, Number(otp))
    }


    const otp = Math.floor(100000 + Math.random() * 900000);
    await this.redis.set(`otp-${email}-${otp}`, otp, 60 * OTP_TIME);

    return this.sendOtp(email, otp)
  }

  private async deleteOtp(email: string, otp: number) {

    return await this.redis.del(`otp-${email}-${otp}`);
  }

  async verifyOtp(email: string, otp: number) {
    const get: string = await this.redis.get(`otp-${email}-${otp}`)

    if (Number(get) === otp) {
      return true;
    }

    return false;
  }

  async checkOtp(email: string) {
    const scan = await this.redis.scan(`otp-${email}-*`)

    if (scan.length > 0) {
      const value = scan[0]

      const regexPattern = /\d{6}$/
      const otp = value.match(regexPattern)[0]

      await this.deleteOtp(email, Number(otp))

      return true
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
