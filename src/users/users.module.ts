import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';


@Module({
  controllers: [UsersController],
  imports: [DrizzleModule],
  providers: [UsersService, DrizzleModule],
})
export class UsersModule {}
