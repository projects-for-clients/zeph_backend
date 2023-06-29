import { Injectable } from '@nestjs/common';
import { Resend } from 'resend';

@Injectable()
export class EmailService {
  private resend = new Resend(process.env.EMAIL_API_KEY);

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
      const initSend = await this.resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: 'Welcome to Zeph Chambers',
        html: '<p>We are happy to have you here!</p>',
      });
    } catch (err) {
      console.log({ err });
    }
  }

  async sendOTP(email: string) {
    try {
      console.log('sending email=====================');
      const initSend = await this.resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: 'OTP Verification',
        html: `<p>This is your OTP code: <strong>${755}</strong>!</p>`,
      });
    } catch (err) {
      console.log({ err });
    }
  }
}
