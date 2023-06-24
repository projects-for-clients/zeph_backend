import { Injectable } from '@nestjs/common';
import { CreateLeaseAgreementDto } from './dto/create-lease_agreement.dto';
import { UpdateLeaseAgreementDto } from './dto/update-lease_agreement.dto';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class LeaseAgreementsService {
  constructor(private readonly redis: RedisService) {}
  create(createLeaseAgreementDto: CreateLeaseAgreementDto) {
    return 'This action adds a new leaseAgreement';
  }

  findAll() {
    const checkStore = this.redis.get('test');
    return JSON.stringify(checkStore);
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
