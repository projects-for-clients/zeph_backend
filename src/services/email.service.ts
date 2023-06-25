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

  async send() {
    console.log('resend', this.resend);

    try {
      console.log('sending email=====================');
      const initSend = await this.resend.emails.send({
        from: 'onboarding@resend.dev',
        to: 'zephchambersdev@gmail.com',
        subject: 'Welcome',
        html: '<p>Congrats on sending your <strong>first email</strong>!</p>',
      });
    } catch (err) {
      console.log({ err });
    }
  }
}
