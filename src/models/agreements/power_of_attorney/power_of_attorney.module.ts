import { Module } from '@nestjs/common';
import { PowerOfAttorneysController } from './power_of_attorney.controller';
import { PowerOfAttorneysService } from './power_of_attorney.service';

@Module({
  controllers: [PowerOfAttorneysController],
  providers: [PowerOfAttorneysService]
})
export class PowerOfAttorneysModule { }
