import { UsersService } from './../models/users/users.service';
import { Module } from '@nestjs/common';
import { TenantsController } from 'src/models/tenants/tenants.controller';
import { TenantsService } from 'src/models/tenants/tenants.service';
import { UsersController } from 'src/models/users/users.controller';
import { RedisService } from 'src/redis/redis.service';
import { RequestService } from 'src/services/request.service';

@Module({
  controllers: [TenantsController, UsersController],
  providers: [RedisService, TenantsService, RequestService],
  exports: [RedisService, RequestService],
})
export class SharedModule {}
