import { Request, Response } from 'express';
import { Injectable, NestMiddleware, Logger, Scope } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRequestService } from 'src/services/userRequest.service';

@Injectable({ scope: Scope.REQUEST })
export class AuthMiddleware implements NestMiddleware {
  private logger = new Logger(AuthMiddleware.name);

  constructor(private jwt: JwtService) {}

  use(req: Request, res: Response, next: () => void) {
    interface Jwt {
      userId: number;
      email: string;
    }

    this.logger.log(AuthMiddleware.name);

    const { baseUrl } = req;

    const urlWithoutVersion = baseUrl.replace(/\/v\d+/, '');
    const allowedPaths = ['/auth/login', '/auth/register'];

    //not authorized
    if (allowedPaths.includes(urlWithoutVersion)) {
      return next();
    }

    //authorized
    const cookie = req.cookies['api-auth'];

    if (!cookie) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    //decrypt jwt
    const jwt: Jwt = this.jwt.verify(cookie, {
      secret: process.env.JWT_SECRET,
    });

    if (!jwt) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    console.log({ jwt });

    UserRequestService.setUser(jwt.userId, jwt.email);

    res.json('Authorized');
  }
}
