import { Injectable } from '@nestjs/common';
import { CreateDeedOfAssignmentDto } from './dto/create-deed_of_assignment.dto';
import { UpdateDeedOfAssignmentDto } from './dto/update-deed_of_assignment.dto';

@Injectable()
export class DeedOfAssignmentsService {
  create(createDeedOfAssignmentDto: CreateDeedOfAssignmentDto) {
    return 'This action adds a new deedOfAssignment';
  }

  findAll() {
    return `This action returns all deedOfAssignments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} deedOfAssignment`;
  }

  update(id: number, updateDeedOfAssignmentDto: UpdateDeedOfAssignmentDto) {
    return `This action updates a #${id} deedOfAssignment`;
  }

  remove(id: number) {
    return `This action removes a #${id} deedOfAssignment`;
  }
}
