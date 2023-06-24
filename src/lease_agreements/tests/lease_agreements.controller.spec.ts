import { Test, TestingModule } from '@nestjs/testing';
import { LeaseAgreementsController } from '../lease_agreements.controller';
import { LeaseAgreementsService } from '../lease_agreements.service';

describe('LeaseAgreementsController', () => {
  let controller: LeaseAgreementsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LeaseAgreementsController],
      providers: [LeaseAgreementsService],
    }).compile();

    controller = module.get<LeaseAgreementsController>(
      LeaseAgreementsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
