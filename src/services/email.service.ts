import { Injectable } from '@nestjs/common';
import { Resend } from 'resend';

@Injectable()
export class EmailService {
  private resend = new Resend(process.env.EMAIL_API_KEY);
  private from = 'zephschambers.com'

  //   constructor(
  //     private to: string,
  //     private from: string,
  //     private subject: string,
  //     private html: string,
  //   ) {}

  async welcome(email: string) {
    console.log('resend', this.resend);

    try {
      console.log('sending email=====================');
      await this.resend.emails.send({
        from: this.from,
        to: email,
        subject: 'Welcome to Zeph Chambers',
        html: '<p>We are happy to have you here!</p>',
      });
    } catch (err) {
      console.log({ err });
    }
  }

  async sendOTP(email: string, otp: number) {
    console.log({ email, otp })
    try {
      console.log('sending email=====================');
      const initSend = await this.resend.emails.send({
        from: this.from,
        to: email,
        subject: 'OTP Verification',
        html: `<p>This is your OTP code: <strong>${otp}</strong></p>`,
      });

      console.log({initSend})

      return initSend
    } catch (err) {
      console.log({ err });
    }
  }
}
