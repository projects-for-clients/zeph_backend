import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LeasesService } from './leases.service';
import { createDto, updateDto } from './dto';

@Controller('leases')
export class LeasesController {
  constructor(private readonly leasesService: LeasesService) {}

  @Post()
  create(@Body() createLeaseDto: createDto) {
    return this.leasesService.create(createLeaseDto);
  }

  @Get()
  findAll() {
    return this.leasesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.leasesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateLeaseDto: updateDto) {
    return this.leasesService.update(+id, updateLeaseDto);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.leasesService.delete(+id);
  }
}
