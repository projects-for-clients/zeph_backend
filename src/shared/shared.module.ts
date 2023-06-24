import { Global, Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { RedisService } from 'src/redis/redis.service';
import { RequestService } from 'src/services/request.service';

@Global()
@Module({
  imports: [],
  providers: [
    RequestService,
    AuthService,
    JwtService,
    RedisService,
    PrismaService,
  ],
  exports: [
    RequestService,
    RedisService,
    PrismaService,
    JwtService,
    AuthService,
  ],
})
export class SharedModule {}
