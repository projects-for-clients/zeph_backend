import { RequestService } from './../services/request.service';
import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private request: RequestService) {}

  use(req: any, res: any, next: () => void) {
    next();
  }
}
