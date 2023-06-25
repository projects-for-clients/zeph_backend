import { Global, Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { RedisService } from 'src/redis/redis.service';
import { UserRequestService } from 'src/services/userRequest.service';

@Global()
@Module({
  providers: [
    UserRequestService,
    AuthService,
    JwtService,
    RedisService,
    PrismaService,
  ],
  exports: [
    UserRequestService,
    RedisService,
    PrismaService,
    JwtService,
    AuthService,
  ],
})
export class SharedModule {}
