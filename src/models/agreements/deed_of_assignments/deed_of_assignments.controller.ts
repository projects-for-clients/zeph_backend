import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DeedOfAssignmentsService } from './deed_of_assignments.service';
import { CreateDeedOfAssignmentDto } from './dto/create-deed_of_assignment.dto';
import { UpdateDeedOfAssignmentDto } from './dto/update-deed_of_assignment.dto';

@Controller('deed-of-assignments')
export class DeedOfAssignmentsController {
  constructor(private readonly deedOfAssignmentsService: DeedOfAssignmentsService) {}

  @Post()
  create(@Body() createDeedOfAssignmentDto: CreateDeedOfAssignmentDto) {
    return this.deedOfAssignmentsService.create(createDeedOfAssignmentDto);
  }

  @Get()
  findAll() {
    return this.deedOfAssignmentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.deedOfAssignmentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDeedOfAssignmentDto: UpdateDeedOfAssignmentDto) {
    return this.deedOfAssignmentsService.update(+id, updateDeedOfAssignmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deedOfAssignmentsService.remove(+id);
  }
}
