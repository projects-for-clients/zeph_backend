import { Module } from '@nestjs/common';
import { PowerOfAttorneysService } from './power_of_attorneys.service';
import { PowerOfAttorneysController } from './power_of_attorneys.controller';

@Module({
  controllers: [PowerOfAttorneysController],
  providers: [PowerOfAttorneysService]
})
export class PowerOfAttorneysModule { }
