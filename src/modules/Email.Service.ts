import { Injectable } from '@nestjs/common';
import { welcome } from 'email';
import { Resend } from 'resend';
import { OTP_TIME } from 'src/constants';
import { UserRequestService } from './../services/userRequest.service';

@Injectable()
export class EmailService {
  private resend = new Resend(process.env.EMAIL_API_KEY);
  private from = 'support@zephschambers.com'
  private zephEmail = 'Zephschambers@gmail.com'


  constructor(private readonly UserRequestService: UserRequestService) { }

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

      console.log({ err })
    }
  }
  async sendAnyEmail(subject: string, content: string) {

    const { email } = this.UserRequestService.getUser()

    try {
      const initSend = await this.resend.emails.send({
        from: this.from,
        // to: 'munisco12@gmail.com',
        to: this.zephEmail,
        subject,
        html: welcome
      });



      return initSend
    } catch (err) {

      console.log({ err })
    }
  }


}
