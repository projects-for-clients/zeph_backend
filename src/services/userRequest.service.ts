import { Injectable, Logger, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.REQUEST })
export class UserRequestService {
  static userId: number;
  static email: string;
  private readonly logger = new Logger(UserRequestService.name);
  static logger: any;

  static setUser(userId: number, email: string) {
    this.userId = userId;
    this.email = email;

    console.log('set user', this.userId, this.email);
  }

  static getUserId() {
    return this.userId;
  }

  static getUser() {
    return {
      userId: this.userId,
      email: this.email,
    };
  }
}
