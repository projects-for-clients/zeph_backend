import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CrudService } from 'src/services/crud.service';
import { UserRequestService } from 'src/services/userRequest.service';
import { IQuery } from 'types/types';
import { createDto, updateDto } from './dto';

@Injectable()
export class LoanService {
    constructor(private CrudService: CrudService) { }

    async create(createLoanDto: createDto, files: Express.Multer.File[]) {
        return this.CrudService.create('loan', createLoanDto as any, files)
    }

    async findAll(query: IQuery) {
        return this.CrudService.findMany('loan', query)
    }

    async findOne(id: number) {
        return this.CrudService.findOne('loan', id)

    }

    async update(id: number, updateData: updateDto) {
        return this.CrudService.update('loan', id, updateData as any)


    }

    async delete(id: number) {
        return this.CrudService.delete('loan', id)

    }
}
