import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { JwtPayload } from 'types/types';


@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger(AuthGuard.name);

  constructor(private reflector: Reflector, private jwt: JwtService) { }


  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const _context = context.switchToHttp().getRequest();

    const cookies = _context.res.req.cookies



    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    console.log({ roles })

    const apiAuthCookie = cookies['api-auth'];

    //decrypt jwt
    const jwt: JwtPayload = this.jwt.verify(apiAuthCookie, {
      secret: process.env.JWT_SECRET,
    });



    console.log({ jwt })



    this.logger.log('AuthGuard', AuthGuard.name);

    return true;
  }
}
