import { Module } from '@nestjs/common';
import { RequestService } from './request.service';

@Module({
  imports: [RequestService],
  providers: [RequestService],
})
export class RequestModule {}
