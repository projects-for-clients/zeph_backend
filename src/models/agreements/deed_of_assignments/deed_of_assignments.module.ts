import { Module } from '@nestjs/common';
import { DeedOfAssignmentsService } from './deed_of_assignments.service';
import { DeedOfAssignmentsController } from './deed_of_assignments.controller';

@Module({
  controllers: [DeedOfAssignmentsController],
  providers: [DeedOfAssignmentsService]
})
export class DeedOfAssignmentsModule {}
