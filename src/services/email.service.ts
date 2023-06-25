import { Injectable } from '@nestjs/common';
import { Resend } from 'resend';

@Injectable()
export class EmailService {
  private resend = new Resend('re_8CJiZ1Dk_J3svncpZvh5mL5vgyfGR7qjg');

  //   constructor(
  //     private to: string,
  //     private from: string,
  //     private subject: string,
  //     private html: string,
  //   ) {}

  async send() {
    try {
      console.log('sending email=====================');
      const initSend = await this.resend.emails.send({
        from: 'onboarding@resend.dev',
        to: 'zephchambersdev@gmail.com',
        subject: 'Hello World',
        html: '<p>Congrats on sending your <strong>first email</strong>!</p>',
      });

      console.log({ initSend });
    } catch (err) {
      console.log({ err });
    }
  }
}
