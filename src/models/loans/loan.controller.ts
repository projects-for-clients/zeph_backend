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
import { LoansService } from './loan.service';

@Controller('loans')
export class LoansController {
  constructor(private readonly loansService: LoansService) { }

  @Post()
  create(@Body() createLeaseDto: createDto) {
    return this.loansService.create(createLeaseDto);
  }

  @Get()
  findAll() {
    return this.loansService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.loansService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateLeaseDto: updateDto) {
    return this.loansService.update(+id, updateLeaseDto);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.loansService.delete(+id);
  }
}
