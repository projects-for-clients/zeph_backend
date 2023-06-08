import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';
import { AuthLogin, AuthRegister } from 'src/dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
  async register(dto: AuthRegister) {
    try {
      const { email, password, firstName, lastName } = dto;
      const hashedPassword = await argon.hash(password);

      const user = await this.prisma.user.create({
        data: {
          email,
          hashedPassword,
          firstName,
          lastName,
        },
      });

      return this.signToken(user.id, user.email);
    } catch (err) {
      if (err.code === 'P2002') {
        throw new ForbiddenException(`${err.meta.target} already exists`);
      }
      throw err;
    }
  }

  async login(dto: AuthLogin) {
    const { email, password } = dto;
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) throw new ForbiddenException('Invalid credentials');

    const isPasswordValid = await argon.verify(user.hashedPassword, password);

    if (!isPasswordValid) throw new ForbiddenException('Invalid credentials');

    // return this.signToken(user.id, user.email);

    return user;
  }

  async signToken(
    userId: number,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
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
