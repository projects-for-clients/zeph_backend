import { Test, TestingModule } from '@nestjs/testing';
import { LeaseAgreementsService } from '../lease_agreements.service';

describe('LeaseAgreementsService', () => {
  let service: LeaseAgreementsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LeaseAgreementsService],
    }).compile();

    service = module.get<LeaseAgreementsService>(LeaseAgreementsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
