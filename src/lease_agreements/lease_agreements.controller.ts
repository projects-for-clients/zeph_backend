import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LeaseAgreementsService } from './lease_agreements.service';
import { CreateLeaseAgreementDto } from './dto/create-lease_agreement.dto';
import { UpdateLeaseAgreementDto } from './dto/update-lease_agreement.dto';

@Controller('lease-agreements')
export class LeaseAgreementsController {
  constructor(
    private readonly leaseAgreementsService: LeaseAgreementsService,
  ) {}

  @Post()
  create(@Body() createLeaseAgreementDto: CreateLeaseAgreementDto) {
    return this.leaseAgreementsService.create(createLeaseAgreementDto);
  }

  @Get()
  findAll() {
    return this.leaseAgreementsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.leaseAgreementsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLeaseAgreementDto: UpdateLeaseAgreementDto,
  ) {
    return this.leaseAgreementsService.update(+id, updateLeaseAgreementDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.leaseAgreementsService.remove(+id);
  }
}
