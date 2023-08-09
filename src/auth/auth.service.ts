/* eslint-disable @typescript-eslint/no-unused-vars */
import { OtpService } from './../services/otp.service';
import { UserRequestService } from './../services/userRequest.service';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { Response } from 'express';
import * as argon from 'argon2';
import { AuthLogin, AuthRegister, AuthVefifyOtp } from 'src/auth/dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import * as dayjs from 'dayjs';

@Injectable()
export class AuthService {
  private readonly secret: string;
  constructor(
    private jwt: JwtService,
    private config: ConfigService,
    private prisma: PrismaService,
    private OtpService: OtpService,
    private userRequestService: UserRequestService,

  ) {
    this.secret = this.config.get('JWT_SECRET');
  }
  async register(dto: AuthRegister) {

    const { email } = dto;

    const findUser = await this.prisma.users.findUnique({
      where: {
        email,
      },
    });

    if (findUser) {
      throw new ForbiddenException("User already exists");
    }

    const otp = await this.OtpService.generateOtp(email)

    if (!otp) {
      throw new ForbiddenException("Error sending OTP");
    }

    return 'Otp sent'

  }

  async verifyOtp(dto: AuthVefifyOtp, res: Response) {
    const {email, otp, password} = dto
    const isValid = await this.OtpService.verifyOtp(email, otp);

    if (!isValid) {
      throw new ForbiddenException("Invalid OTP");
    }

    const hashedPassword = await argon.hash(password);

    return res.json({
      message: 'Verified'
    })


    const user = await this.prisma.users.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    if (!user) {
      throw new ForbiddenException("User already exists");
    }
    
    return this.signToken(user.id, user.email, res);
   
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
    this.userRequestService.clearUser();
    res.json({
      message: 'success',
    });

  }
}
