import { Module } from '@nestjs/common';
import { PowerOfAttorneyController } from './power_of_attorney.controller';
import { PowerOfAttorneyService } from './power_of_attorney.service';

@Module({
  controllers: [PowerOfAttorneyController],
  providers: [PowerOfAttorneyService]
})
export class PowerOfAttorneyModule { }
