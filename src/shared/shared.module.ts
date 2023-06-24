import { UsersService } from './../models/users/users.service';
import { Global, Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthController } from 'src/auth/auth.controller';
import { AuthService } from 'src/auth/auth.service';
import { TenantsController } from 'src/models/tenants/tenants.controller';
import { TenantsService } from 'src/models/tenants/tenants.service';
import { UsersController } from 'src/models/users/users.controller';
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
