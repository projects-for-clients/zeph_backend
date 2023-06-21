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
    private prisma: PrismaService,
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

      return {
        email: user.email,
      };
    } catch (err) {
      if (err.code === 'P2002') {
        throw new ForbiddenException(`${err.meta.target} already exists`);
      }
      throw err;
    }
  }

  async login(dto: AuthLogin) {
    const { email, password } = dto;

    const user = await this.prisma.users.findMany();

    // const user = await this.prisma.users.findUnique({
    //   where: {
    //     email,
    //   },
    // });

    // console.log(user);

    // if (!user) throw new ForbiddenException('Invalid credentials');

    // const isPasswordValid = await argon.verify(user.hashedPassword, password);

    // if (!isPasswordValid) throw new ForbiddenException('Invalid Password');

    // delete user.hashedPassword;
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
