import { Module } from '@nestjs/common';
import { DeedOfAssignmentsController } from './deed_of_assignment.controller';
import { DeedOfAssignmentsService } from './deed_of_assignment.service';

@Module({
  controllers: [DeedOfAssignmentsController],
  providers: [DeedOfAssignmentsService]
})
export class DeedOfAssignmentsModule { }
