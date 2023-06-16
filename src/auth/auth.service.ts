import { ForbiddenException, Injectable } from '@nestjs/common';
import * as argon from 'argon2';
import { AuthLogin, AuthRegister } from 'src/dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(private jwt: JwtService, private config: ConfigService) {}
  async register(dto: AuthRegister) {
    try {
      const { email, password, firstName, lastName } = dto;
      const hashedPassword = await argon.hash(password);

      // const user = await this.prisma.user.create({
      //   data: {
      //     email,
      //     hashedPassword,
      //     firstName,
      //     lastName,
      //   },
      // });

      const user = {
        id: 1,
        email,
      };

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

    const user = {
      id: 1,
      hashedPassword: 'hellosdfds',
    };

    if (!user) throw new ForbiddenException('Invalid credentials');

    const isPasswordValid = await argon.verify(user.hashedPassword, password);

    if (!isPasswordValid) throw new ForbiddenException('Invalid credentials');

    // return this.signToken(user.id, user.email);

    delete user.hashedPassword;

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
