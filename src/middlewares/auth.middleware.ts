import { Request, Response } from 'express';
import { Injectable, NestMiddleware, Logger, Scope } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable({ scope: Scope.REQUEST })
export class AuthMiddleware implements NestMiddleware {
  private logger = new Logger(AuthMiddleware.name);

  constructor(private jwt: JwtService) {}

  use(req: Request, res: Response, next: () => void) {
    this.logger.log(AuthMiddleware.name);

    const { baseUrl, url, originalUrl } = req;

    console.log({ baseUrl, url, originalUrl });

    //not authorized
    if (baseUrl === '/v1/auth/login' || baseUrl === '/v1/auth/register') {
      return next();
    }

    //authorized
    const cookie = req.cookies['api-auth'];

    if (!cookie) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    //check if the cookie time is expired

    //decrypt jwt
    const jwt = this.jwt.verify(cookie, {
      secret: process.env.JWT_SECRET,
    });

    if (!jwt) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    //check for expiry of jwt

    console.log({ jwt });

    const cookieTime = cookie.split('.')[1];
    const cookieTimeInMs = parseInt(cookieTime) * 1000;
    const now = Date.now();

    res.json('Authorized');
  }
}
