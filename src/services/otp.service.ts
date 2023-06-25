import { Injectable } from '@nestjs/common';

@Injectable()
export class OtpService {
  private otp: number;

  generateOtp() {
    this.otp = Math.floor(100000 + Math.random() * 900000);
  }

  deleteOtp() {
    this.otp = null;
  }

  verifyOtp() {}

  sendOtp() {}
}
