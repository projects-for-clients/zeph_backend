import { RequestService } from './../services/request.service';
import { ForbiddenException, Injectable } from '@nestjs/common';
import * as argon from 'argon2';
import { AuthLogin, AuthRegister } from 'src/auth/dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    private config: ConfigService,
    private prisma: PrismaService, // private readonly requestService: RequestService,
  ) {}
  async register(dto: AuthRegister) {
    try {
      const { email, password } = dto;
      const hashedPassword = await argon.hash(password);

      const user = await this.prisma.users.create({
        data: {
          email,
          password: hashedPassword,
        },
      });

      return this.signToken(user.id);
    } catch (err) {
      if (err.code === 'P2002') {
        throw new ForbiddenException(`${err.meta.target} already exists`);
      }
      throw err;
    }
  }

  async login(dto: AuthLogin) {
    const { email, password } = dto;

    const user = await this.prisma.users.findFirst({
      where: {
        email,
      },
    });

    if (!user) throw new ForbiddenException('Invalid credentials');

    const isPasswordValid = await argon.verify(user.password, password);

    if (!isPasswordValid) throw new ForbiddenException('Invalid Password');

    // this.requestService.setUserId(user.id);

    return this.signToken(user.id);
  }

  async signToken(userId: number): Promise<{ access_token: string }> {
    const payload = {
      id: userId,
    };

    const secret = this.config.get('JWT_SECRET');

    const token = this.jwt.sign(payload, {
      expiresIn: '15m',
      secret,
    });
    return {
      access_token: token,
    };
  }
}
