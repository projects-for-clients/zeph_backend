import { Injectable, Logger, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.REQUEST })
export class UserRequestService {
  private userId: number;
  private email: string;
  private readonly logger = new Logger(UserRequestService.name);

  setUser(userId: number, email: string) {
    this.userId = userId;
    this.email = email;

    console.log('set user', this.userId, this.email);
  }

  getUserId() {
    console.log('get user', this.userId);
    return this.userId;
  }

  getUser() {
    return {
      userId: this.userId,
      email: this.email,
    };
  }
}
