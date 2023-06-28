import { Test, TestingModule } from '@nestjs/testing';
import { DeedOfAssignmentsService } from './deed_of_assignments.service';

describe('DeedOfAssignmentsService', () => {
  let service: DeedOfAssignmentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeedOfAssignmentsService],
    }).compile();

    service = module.get<DeedOfAssignmentsService>(DeedOfAssignmentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
