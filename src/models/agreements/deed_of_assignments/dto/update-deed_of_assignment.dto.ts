import { PartialType } from '@nestjs/swagger';
import { CreateDeedOfAssignmentDto } from './create-deed_of_assignment.dto';

export class UpdateDeedOfAssignmentDto extends PartialType(CreateDeedOfAssignmentDto) {}
