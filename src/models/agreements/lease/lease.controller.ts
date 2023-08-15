import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { createDto, updateDto } from './dto';
import { LeaseService } from './lease.service';

@Controller('lease')
export class LeaseController {
  constructor(private readonly leaseService: LeaseService) { }

  @Post()
  create(@Body() createLeaseDto: createDto) {
    return this.leaseService.create(createLeaseDto);
  }

  @Get()
  findAll() {
    return this.leaseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.leaseService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateLeaseDto: updateDto) {
    return this.leaseService.update(+id, updateLeaseDto);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.leaseService.delete(+id);
  }
}
