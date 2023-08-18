
import { Injectable } from "@nestjs/common";
import { CrudService } from 'src/services/crud.service';

import { IQuery } from "types/types";
import { CreateDto, UpdateTdo } from "./dto";


@Injectable()
export class SaleService {
    constructor(
        private CrudService: CrudService
    ) { }

    async create(createDto: CreateDto, files: Express.Multer.File[]) {

        return this.CrudService.create('sale', createDto as any, files)


    }

    async findAll(query: IQuery) {
        return this.CrudService.findMany('sale', query)
    }

    async findOne(id: number) {
        return this.CrudService.findOne('sale', id)
    }

    async update(id: number, updateData: UpdateTdo) {

        return this.CrudService.update('sale', id, updateData as any)
    }

    async delete(id: number) {
        return this.CrudService.delete('sale', id)
    }
}
