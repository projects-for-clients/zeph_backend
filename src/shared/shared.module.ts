import { UsersService } from './../models/users/users.service';
import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthController } from 'src/auth/auth.controller';
import { AuthService } from 'src/auth/auth.service';
import { TenantsController } from 'src/models/tenants/tenants.controller';
import { TenantsService } from 'src/models/tenants/tenants.service';
import { UsersController } from 'src/models/users/users.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { RedisService } from 'src/redis/redis.service';
import { RequestService } from 'src/services/request.service';

@Module({
  imports: [],
  controllers: [TenantsController, UsersController, AuthController],
  providers: [
    PrismaService,
    RedisService,
    TenantsService,
    RequestService,
    UsersService,
    AuthService,
    JwtService,
  ],
  exports: [RequestService],
})
export class SharedModule {}
