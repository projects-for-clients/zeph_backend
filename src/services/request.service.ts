import { Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.REQUEST })
export class RequestService {
  private userId: number;

  constructor() {
    this.userId = null;
  }

  setUserId(userId: number) {
    this.userId = userId;
  }

  getUserId() {
    return this.userId;
  }
}
