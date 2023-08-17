import { Injectable } from '@nestjs/common';
import { OTP_TIME } from 'constants';
import { Resend } from 'resend';

@Injectable()
export class EmailService {
  private resend = new Resend(process.env.EMAIL_API_KEY);
  private from = 'support@zephschambers.com'

  //   constructor(
  //     private to: string,
  //     private from: string,
  //     private subject: string,
  //     private html: string,
  //   ) {}

  async welcome(email: string) {

    try {

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

    try {
      const initSend = await this.resend.emails.send({
        from: this.from,
        to: email,
        subject: 'OTP Verification',
        html: `<p>This is your OTP code: <strong>${otp}</strong></p> </br> <p>Only Valid for ${OTP_TIME} minutes</p>`,
      });



      return initSend
    } catch (err) {

      console.log({err})
    }
  }
}
