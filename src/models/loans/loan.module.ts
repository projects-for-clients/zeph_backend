import { Module } from '@nestjs/common';
import { LoansController } from './loan.controller';
import { LoansService } from './loan.service';

@Module({
  controllers: [LoansController],
  providers: [LoansService]
})
export class LoansModule { }
