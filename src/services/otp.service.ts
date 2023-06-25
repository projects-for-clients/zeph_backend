import { Injectable } from '@nestjs/common';

@Injectable()
export class OtpService {
  constructor() {}

  generateOtp() {
    const otp = Math.floor(100000 + Math.random() * 900000);
  }

  deleteOtp() {}

  verifyOtp() {}

  sendOtp() {}
}
