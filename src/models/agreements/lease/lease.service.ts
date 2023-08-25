import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CrudService } from 'src/services/crud.service';
import { UserRequestService } from 'src/services/userRequest.service';

import { IQuery } from 'types/types';
import { createDto, updateDto } from './dto';


@Injectable()
export class LeaseService {
  constructor(private CrudService: CrudService) { }

  async create(createDto: createDto, files: Express.Multer.File[]) {

    return this.CrudService.create('lease', createDto as any, files)


  }

  async findAll(query: IQuery) {
    return this.CrudService.findMany('lease', query)
  }

  async findOne(id: number) {
    return this.CrudService.findOne('lease', id)

  }

  async update(id: number, updateData: updateDto) {
    return this.CrudService.update('lease', id, updateData as any)


  }

  async delete(id: number) {
    return this.CrudService.delete('lease', id)

  }
}
