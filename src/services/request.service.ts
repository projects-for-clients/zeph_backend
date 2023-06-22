import { Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.REQUEST })
export class RequestService {
  private userId: number;

  constructor() {
    this.userId = null;
  }

  setUserId(userId: number) {
    console.log('setUserId', userId);
    this.userId = userId;
  }

  getUserId() {
    console.log('getUserId', this.userId);
    return this.userId;
  }
}
