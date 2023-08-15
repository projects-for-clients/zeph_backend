import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('contract')
export class ContractController {
  @Get()
  findAll(@Body() body: any) {
    return 'This action returns all contract';
  }

  @Get(':id')
  findOne(@Body() body: any) {
    return 'This action returns a #${id} contract';
  }

  @Post()
  create(@Body() body: any) {
    return 'This action adds a new contract';
  }

  @Post(':id')
  update(@Body() body: any) {
    return 'This action updates a #${id} contract';
  }
}
