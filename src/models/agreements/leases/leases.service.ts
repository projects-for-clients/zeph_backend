import { Injectable } from '@nestjs/common';
import { LeasesDto } from './dto';

@Injectable()
export class LeasesService {
  create(createLeaseDto: LeasesDto) {
    return 'This action adds a new lease';
  }

  findAll() {
    return `This action returns all leases`;
  }

  findOne(id: number) {
    return `This action returns a #${id} lease`;
  }

  update(id: number, updateLeaseDto: LeasesDto) {
    return `This action updates a #${id} lease`;
  }

  remove(id: number) {
    return `This action removes a #${id} lease`;
  }
}
