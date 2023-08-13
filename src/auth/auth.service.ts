import { EmailService } from 'src/services/email.service';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { users } from '@prisma/client';
import * as argon from 'argon2';
import * as dayjs from 'dayjs';
import { Response } from 'express';
import { AuthEmail, AuthLogin, AuthOtp, AuthRegister } from 'src/auth/dto';
import { PrismaService } from 'src/prisma/prisma.service';
/* eslint-disable @typescript-eslint/no-unused-vars */
import { OtpService } from './../services/otp.service';
import { UserRequestService } from './../services/userRequest.service';

@Injectable()
export class AuthService {
  private readonly secret: string;
  constructor(
    private jwt: JwtService,
    private config: ConfigService,
    private prisma: PrismaService,
    private OtpService: OtpService,
    private EmailService: EmailService,
    private userRequestService: UserRequestService,

  ) {
    this.secret = this.config.get('JWT_SECRET');
  }
  async authEmail(dto: AuthEmail) {
    //TODO:Read up on Sessions

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

  async authOtp(dto: AuthOtp) {

    const { email, otp } = dto

    const isValid = await this.OtpService.verifyOtp(email, otp);

    if (!isValid) {
      throw new ForbiddenException("Invalid OTP");
    }

    return "Valid OTP"

  }

  async authRegister(dto: AuthRegister, res: Response) {
    const { email, password, firstName, lastName } = dto

    const stillCheckOtp = await this.OtpService.checkOtp(email)

    if (!stillCheckOtp) {
      throw new ForbiddenException("OTP Error");
    }

    const hashedPassword = await argon.hash(password);


    const createUserAccount = async (): Promise<users> => {
      return this.prisma.$transaction(async (tx) => {
        const findUser = await tx.users.findUnique({
          where: {
            email,
          },
        });

        if (findUser) {
          throw new ForbiddenException("User already exists");
        }


        const user = await tx.users.create({
          data: {
            email,
            firstName,
            lastName,
            hashedPassword,
          },
        });

        const account = await tx.accounts.create({
          data: {
            type: "credentials",
            userId: user.id,
          },
        });

        if (!account) {
          throw new ForbiddenException("Error creating account");
        }

        this.EmailService.welcome(email)


        return user;
      });

    }

    const users = await createUserAccount();

    return this.signToken(users.id, users.email, res);

  }

  async login(dto: AuthLogin, res: Response) {
    const { email, password } = dto;

    const user = await this.prisma.users.findUnique({
      where: {
        email,
      },
    });


    if (!user) {
      throw new ForbiddenException("Invalid credentials");
    }


    const isPasswordValid = await argon.verify(user.hashedPassword, password);


    if (!isPasswordValid) {
      throw new ForbiddenException("Invalid Password!");
    }


    return this.signToken(user.id, user.email, res);
  }

  async signToken(userId: number, email: string, res: Response): Promise<void> {
    console.log({ userId, email }, 'sign token')
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
