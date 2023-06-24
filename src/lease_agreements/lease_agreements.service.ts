import { Injectable } from '@nestjs/common';
import { CreateLeaseAgreementDto } from './dto/create-lease_agreement.dto';
import { UpdateLeaseAgreementDto } from './dto/update-lease_agreement.dto';

@Injectable()
export class LeaseAgreementsService {
  create(createLeaseAgreementDto: CreateLeaseAgreementDto) {
    return 'This action adds a new leaseAgreement';
  }

  findAll() {
    return `This action returns all leaseAgreements`;
  }

  findOne(id: number) {
    return `This action returns a #${id} leaseAgreement`;
  }

  update(id: number, updateLeaseAgreementDto: UpdateLeaseAgreementDto) {
    return `This action updates a #${id} leaseAgreement`;
  }

  remove(id: number) {
    return `This action removes a #${id} leaseAgreement`;
  }
}
