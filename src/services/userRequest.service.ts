import { Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.REQUEST })
export class UserRequestService {
  private userId: number;
  private email: string;


  setUser(userId: number, email: string) {
    this.userId = userId;
    this.email = email;
  }

  getUserId() {
    return this.userId;
  }

  getUser() {
    return {
      userId: this.userId,
      email: this.email,
    };
  }
}
