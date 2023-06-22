import { RequestService } from './../services/request.service';
import { Injectable, NestMiddleware, Logger } from '@nestjs/common';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private logger = new Logger(AuthMiddleware.name);

  constructor(private request: RequestService) {}

  use(req: any, res: any, next: () => void) {
    this.logger.log(AuthMiddleware.name);
    console.log({ req });
    next();
  }
}
