import { Injectable, Scope } from '@nestjs/common';
import { JwtPayload, Role } from 'types/types';

@Injectable({ scope: Scope.REQUEST })
export class UserRequestService {
  private userId: number;
  private email: string;
  private role:  Role


  setUser({
    email,
    userId,
    role
  }: JwtPayload) {
    this.userId = userId;
    this.email = email;
    this.role = role


  }

  clearUser() {
    this.userId = null;
    this.email = null;
    this.role = null
  }

  getUserId() {
    return this.userId;
  }

  getUser() {
    return {
      userId: this.userId,
      email: this.email,
      role: this.role
    };
  }
}
