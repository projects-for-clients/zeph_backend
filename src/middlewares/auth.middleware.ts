import { RequestService } from './../services/request.service';
import { Injectable, NestMiddleware, Logger } from '@nestjs/common';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private logger = new Logger(AuthMiddleware.name);

  constructor(private request: RequestService) {}

  use(req: any, res: any, next: () => void) {
    this.logger.log('MiddleWare-------', AuthMiddleware.name);
    console.log({ req });
    const bearerToken = req['headers']['authorization']
      ? req['headers']['authorization'].split(' ')[1]
      : null;

    if (bearerToken) {
      console.log('bearerToken', AuthMiddleware.name, bearerToken);
      this.request.setUserId(bearerToken);
    }

    next();
  }
}
