

import { Injectable } from "@nestjs/common";
import * as fs from "fs/promises";
import { CrudService } from 'src/services/crud.service';
import { IQuery } from "types/types";
import { CreateDto, UpdateTdo } from "./dto";


@Injectable()
export class PowerOfAttorneyService {
    constructor(
        private CrudService: CrudService


    ) { }


    async create(createDto: CreateDto, files: Express.Multer.File[]) {

        return this.CrudService.create('power_of_attorney', createDto as any, files)


    }

    async findAll(query: IQuery) {
        return this.CrudService.findMany('power_of_attorney', query)
    }

    async findOne(id: number) {
        return this.CrudService.findOne('power_of_attorney', id)
    }

    async update(id: number, updateData: UpdateTdo) {

        return this.CrudService.update('power_of_attorney', id, updateData as any)
    }

    async delete(id: number) {
        return this.CrudService.delete('power_of_attorney', id)
    }
}
