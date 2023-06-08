import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UniversityService } from './university.service';
import { CreateUniversity } from 'src/dto/university.dto';

@Controller('university')
export class UniversityController {
  constructor(private universityService: UniversityService) {}

  @Get('/all')
  getAll() {
    return this.universityService.getAll();
  }

  @Get('/:id')
  getOne(@Param('id') id: string) {
    return this.universityService.getOne(id);
  }

  @Post('/create')
  create(@Body() dto: CreateUniversity) {
    return this.universityService.create(dto);
  }

  @Put('/update/:id')
  update(@Param('id') id: string, @Body() dto: CreateUniversity) {
    return this.universityService.update(id, dto);
  }

  @Delete('/delete/:id')
  delete(@Param('id') id: string) {
    return this.universityService.delete(id);
  }
}
