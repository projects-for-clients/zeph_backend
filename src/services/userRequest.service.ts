import { Injectable, Logger, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.REQUEST })
export class UserRequestService {
  private userId: number;
  private email: string;
  private readonly logger = new Logger(UserRequestService.name);

  constructor() {
    this.userId = null;
    this.email = null;
  }

  setUser(userId: number, email: string) {
    this.logger.log('SET-USERID', UserRequestService.name, userId);
    this.userId = userId;
    this.email = email;
  }

  getUserId() {
    this.logger.log('GET-USERID', UserRequestService.name, this.userId);

    return this.userId;
  }

  getUser() {
    return {
      userId: this.userId,
      email: this.email,
    };
  }
}
