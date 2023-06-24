import { RequestService } from './../services/request.service';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { Response } from 'express';
import * as argon from 'argon2';
import { AuthLogin, AuthRegister } from 'src/auth/dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  private readonly secret: string;

  constructor(
    private jwt: JwtService,
    private config: ConfigService,
    private prisma: PrismaService,
    private readonly requestService: RequestService,
  ) {
    this.secret = this.config.get('JWT_SECRET');
  }
  async register(dto: AuthRegister, res: Response) {
    try {
      const { email, password } = dto;
      const hashedPassword = await argon.hash(password);

      const user = await this.prisma.users.create({
        data: {
          email,
          password: hashedPassword,
        },
      });

      return this.signToken(user.id, user.email, res);
    } catch (err) {
      if (err.code === 'P2002') {
        throw new ForbiddenException(`${err.meta.target} already exists`);
      }
      throw err;
    }
  }

  async login(dto: AuthLogin, res: Response) {
    const { email, password } = dto;

    const user = await this.prisma.users.findFirst({
      where: {
        email,
      },
    });

    if (!user) throw new ForbiddenException('Invalid credentials');

    const isPasswordValid = await argon.verify(user.password, password);

    if (!isPasswordValid) throw new ForbiddenException('Invalid Password');

    this.requestService.setUserId(user.id);

    await this.signToken(user.id, user.email, res);
  }

  async signToken(
    userId: number,
    email: string,
    res: Response,
  ): Promise<string> {
    const payload = {
      id: userId,
      email,
    };

    const token = this.jwt.sign(payload, {
      expiresIn: '15m',
      secret: this.secret,
    });

    this.setCookie(res, token);
    return res.json('Ok');
  }

  setCookie(res: Response, token: string) {
    res.cookie('cookieName', token, {
      expires: new Date(Date.now() + 86400000),
      httpOnly: true,
      secure: false,
      encode(val) {
        return val;
      },
      sameSite: 'strict',
    });
  }
}
