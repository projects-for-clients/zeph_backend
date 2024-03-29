import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { user } from '@prisma/client';
import * as argon from 'argon2';
import * as dayjs from 'dayjs';
import { CookieOptions, Response } from 'express';
import { AuthEmail, AuthLogin, AuthOtp, AuthRegister } from 'src/auth/dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtPayload, Role } from 'types/types';
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
    private userRequestService: UserRequestService,

  ) {
    this.secret = this.config.get('JWT_SECRET');
  }
  async authEmail(dto: AuthEmail) {
    //TODO:Read up on Sessions

    const { email } = dto;

    const findUser = await this.prisma.user.findUnique({
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


    const createUserAccount = async (): Promise<user> => {
      return this.prisma.$transaction(async (tx) => {
        const findUser = await tx.user.findUnique({
          where: {
            email,
          },
        });

        if (findUser) {
          throw new ForbiddenException("User already exists");
        }


        const user = await tx.user.create({
          data: {
            email,
            firstName,
            lastName,
            hashedPassword,
          },
        });

        const account = await tx.account.create({
          data: {
            type: "credentials",
            userId: user.id,
          },
        });

        if (!account) {
          throw new ForbiddenException("Error creating account");
        }


        return user;
      });

    }

    const user = await createUserAccount();

    return this.signToken(user.id, user.email, user.role, res);

  }

  async login(dto: AuthLogin, res: Response) {
    const { email, password } = dto;

    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    console.log({email, password, user})


    if (!user) {
      throw new ForbiddenException("Invalid credentials");
    }


    const isPasswordValid = await argon.verify(user.hashedPassword, password);


    if (!isPasswordValid) {
      throw new ForbiddenException("Invalid Password!");
    }


    return this.signToken(user.id, user.email, user.role, res);
  }

  async signToken(userId: number, email: string, role: Role, res: Response): Promise<void> {

    const payload: JwtPayload = {
      userId,
      email,
      role,
    }

    const token = this.jwt.sign(payload, {
      secret: this.secret,
    });

    const expiryTime =
      dayjs().add(1, 'day').toDate()


    const cookieOptions = {
      expires: expiryTime,
      secure: true,

      httpOnly: true,
      sameSite: "none",
    } as CookieOptions
    res.cookie('api-auth', token, cookieOptions);


    res.json({
      message: 'success',
      email,
      role,
      cookie: {
        token,
        expires: cookieOptions.expires
      }
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
