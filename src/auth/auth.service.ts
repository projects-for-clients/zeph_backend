import { ForbiddenException, Injectable } from '@nestjs/common';
import { Response } from 'express';
import * as argon from 'argon2';
import { AuthLogin, AuthRegister } from 'src/auth/dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { EmailService } from 'src/services/email.service';
import * as dayjs from 'dayjs';

@Injectable()
export class AuthService {
  private readonly secret: string;
  constructor(
    private jwt: JwtService,
    private config: ConfigService,
    private prisma: PrismaService,
    private EmailService: EmailService,
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

    const user = await this.prisma.users.findUnique({
      where: {
        email,
      },
    });

    if (!user) throw new ForbiddenException('Invalid credentials');

    const isPasswordValid = await argon.verify(user.password, password);

    if (!isPasswordValid) throw new ForbiddenException('Invalid Password!');

    await this.EmailService.send();

    return this.signToken(user.id, user.email, res);
  }

  async signToken(userId: number, email: string, res: Response): Promise<void> {
    const payload = {
      id: userId,
      email,
    };

    const token = this.jwt.sign(payload, {
      secret: this.secret,
    });

    const isProduction = this.config.get('NODE_ENV') === 'production';

    const expiryTime = isProduction
      ? dayjs().add(1, 'day').toDate()
      : dayjs().add(1, 'day').toDate();

    res.cookie('api-auth', token, {
      expires: expiryTime,
      httpOnly: true,
      secure: isProduction,
      sameSite: 'strict',
    });

    res.json({
      message: 'success',
      email,
    });
  }

  async logout(res: Response): Promise<void> {

    res.clearCookie('api-auth');
    res.json({
      message: 'success',
    });

  }
}
