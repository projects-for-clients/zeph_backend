import { Request, Response } from 'express';
import { RequestService } from './../services/request.service';
import { Injectable, NestMiddleware, Logger, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.REQUEST })
export class AuthMiddleware implements NestMiddleware {
  private logger = new Logger(AuthMiddleware.name);

  constructor(private request: RequestService) {}

  use(req: Request, res: Response, next: () => void) {
    this.logger.log(AuthMiddleware.name);

    const { baseUrl, url, user } = req;

    console.log({ baseUrl, url, user });

    next();
  }
}
