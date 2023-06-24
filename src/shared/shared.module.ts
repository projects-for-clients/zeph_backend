import { UsersService } from './../models/users/users.service';
import { Module } from '@nestjs/common';
import { AuthController } from 'src/auth/auth.controller';
import { TenantsController } from 'src/models/tenants/tenants.controller';
import { TenantsService } from 'src/models/tenants/tenants.service';
import { UsersController } from 'src/models/users/users.controller';
import { UsersModule } from 'src/models/users/users.module';
import { RedisService } from 'src/redis/redis.service';
import { RequestService } from 'src/services/request.service';

@Module({
  controllers: [TenantsController, UsersController, AuthController],
  providers: [RedisService, TenantsService, RequestService, UsersService],
  exports: [RequestService],
})
export class SharedModule {}
