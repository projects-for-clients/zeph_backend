import { Request, Response } from 'express';
import { RequestService } from './../services/request.service';
import { Injectable, NestMiddleware, Logger, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.REQUEST })
export class AuthMiddleware implements NestMiddleware {
  private logger = new Logger(AuthMiddleware.name);

  constructor(private request: RequestService) {}

  use(req: Request, res: Response, next: () => void) {
    this.logger.log('MiddleWare-------', AuthMiddleware.name);
    this.logger.debug(req.cookies, req.headers);
    const bearerToken = req['headers']['authorization']
      ? req['headers']['authorization'].split(' ')[1]
      : null;

    // if (bearerToken) {
    //   this.request.setUserId(bearerToken);
    // }

    next();
  }
}
