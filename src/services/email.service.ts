import { Injectable } from '@nestjs/common';
import { Resend } from 'resend';

@Injectable()
export class EmailService {
  private resend = new Resend('re_8CJiZ1Dk_J3svncpZvh5mL5vgyfGR7qjg');

  constructor(
    private to: string,
    private from: string,
    private subject: string,
    private html: string,
  ) {}

  async send() {
    try {
      this.resend.emails.send({
        from: 'onboarding@zephChambers.support',
        to: 'zephchambersdev@gmail.com',
        subject: 'Hello World',
        html: '<p>Congrats on sending your <strong>first email</strong>!</p>',
      });
    } catch (err) {
      console.log(err);
    }
  }
}
