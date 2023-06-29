import { Test, TestingModule } from '@nestjs/testing';
import { PowerOfAttorneysService } from './power_of_attorneys.service';

describe('PowerOfAttorneysService', () => {
  let service: PowerOfAttorneysService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PowerOfAttorneysService],
    }).compile();

    service = module.get<PowerOfAttorneysService>(PowerOfAttorneysService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
