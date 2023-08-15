import { Module } from '@nestjs/common';
import { DeedOfAssignmentController } from './deed_of_assignment.controller';
import { DeedOfAssignmentService } from './deed_of_assignment.service';

@Module({
  controllers: [DeedOfAssignmentController],
  providers: [DeedOfAssignmentService]
})
export class DeedOfAssignmentModule { }
