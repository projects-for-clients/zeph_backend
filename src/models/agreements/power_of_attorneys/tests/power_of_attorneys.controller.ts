import { Controller } from '@nestjs/common';
import { PowerOfAttorneysService } from '../power_of_attorneys.service';

@Controller('power-of-attorneys')
export class PowerOfAttorneysController {
  constructor(private readonly powerOfAttorneysService: PowerOfAttorneysService) { }
}
