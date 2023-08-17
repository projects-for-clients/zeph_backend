import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { UserRequestService } from 'src/services/userRequest.service';
import { JwtPayload } from 'types/types';


@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger(AuthGuard.name);

  constructor(private reflector: Reflector, private jwt: JwtService, private user: UserRequestService) { }


  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse()
    console.log('REQ=========', { req })

    console.log('RES=========',{ res })


    // const roles = this.reflector.get<string[]>('roles', context.getHandler());

    // console.log({ roles })

    // const cookie = req.cookies['api-auth'];

    // if (!cookie) {
    //   return res.status(401).json({ message: 'Unauthorized' });
    // }

    // //decrypt jwt
    // const jwt: JwtPayload = this.jwt.verify(cookie, {
    //   secret: process.env.JWT_SECRET,
    // });



    // if (!jwt) {
    //   return res.status(401).json({ message: 'Unauthorized' });
    // }

    // console.log({jwt})


    // console.log("user request", this.userRequest)

    // this.logger.log('AuthGuard', AuthGuard.name);

    return true;
  }
}
