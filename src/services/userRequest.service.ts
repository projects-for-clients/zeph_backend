import { Injectable, Logger, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.REQUEST })
export class UserRequestService {
  private static userId: number;
  private static email: string;
  private readonly logger = new Logger(UserRequestService.name);
  static logger: any;

  static setUser(userId: number, email: string) {
    this.logger.log('set user', userId, email);
    this.userId = userId;
    this.email = email;

  }

  static getUserId() {
    console.log('get user', this.userId);
    return this.userId;
  }

  static getUser() {
    return {
      userId: this.userId,
      email: this.email,
    };
  }
}
