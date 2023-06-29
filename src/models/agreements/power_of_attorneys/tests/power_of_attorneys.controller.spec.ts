import { Test, TestingModule } from '@nestjs/testing';
import { PowerOfAttorneysController } from './power_of_attorneys.controller';
import { PowerOfAttorneysService } from '../power_of_attorneys.service';

describe('PowerOfAttorneysController', () => {
  let controller: PowerOfAttorneysController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PowerOfAttorneysController],
      providers: [PowerOfAttorneysService],
    }).compile();

    controller = module.get<PowerOfAttorneysController>(PowerOfAttorneysController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
