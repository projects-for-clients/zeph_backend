import { Global, Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { RedisService } from 'src/redis/redis.service';
import { userRequestService } from 'src/services/userRequest.service';

@Global()
@Module({
  providers: [
    userRequestService,
    AuthService,
    JwtService,
    RedisService,
    PrismaService,
  ],
  exports: [
    userRequestService,
    RedisService,
    PrismaService,
    JwtService,
    AuthService,
  ],
})
export class SharedModule {}
