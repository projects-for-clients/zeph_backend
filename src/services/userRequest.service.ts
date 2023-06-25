import { Injectable, Logger, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.REQUEST })
export class UserRequestService {
  private userId: number;
  private readonly logger = new Logger(UserRequestService.name);

  constructor() {
    this.userId = null;
  }

  setUserId(userId: number) {
    this.logger.log('SET-USERID', UserRequestService.name, userId);
    this.userId = userId;
  }

  getUserId() {
    this.logger.log('GET-USERID', UserRequestService.name, this.userId);

    return this.userId;
  }
}
