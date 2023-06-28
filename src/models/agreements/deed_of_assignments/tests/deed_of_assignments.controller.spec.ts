import { Test, TestingModule } from '@nestjs/testing';
import { DeedOfAssignmentsController } from '../deed_of_assignments.controller';
import { DeedOfAssignmentsService } from '../deed_of_assignments.service';

describe('DeedOfAssignmentsController', () => {
  let controller: DeedOfAssignmentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeedOfAssignmentsController],
      providers: [DeedOfAssignmentsService],
    }).compile();

    controller = module.get<DeedOfAssignmentsController>(DeedOfAssignmentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
