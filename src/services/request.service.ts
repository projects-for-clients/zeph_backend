import { Injectable, Logger, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.REQUEST })
export class RequestService {
  private userId: number;
  private readonly logger = new Logger(RequestService.name);

  constructor() {
    this.userId = null;
  }

  setUserId(userId: number) {
    this.logger.log('SET-USERID', RequestService.name, userId);
    this.userId = userId;
  }

  getUserId() {
    this.logger.log('GET-USERID', RequestService.name, this.userId);

    return this.userId;
  }
}
