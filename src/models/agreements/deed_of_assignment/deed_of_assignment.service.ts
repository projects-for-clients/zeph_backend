/* eslint-disable @typescript-eslint/no-unused-vars */

import { Injectable } from "@nestjs/common";
import { CrudService } from 'src/services/crud.service';

import { IQuery } from "types/types";
import { CreateDto, UpdateTdo } from "./dto";


@Injectable()
export class DeedOfAssignmentService {
  constructor(
    private CrudService: CrudService


  ) { }


  async create(createDto: CreateDto, files: Express.Multer.File[]) {

    return this.CrudService.create('deed_of_assignment', createDto as any, files)


  }

  async findAll(query: IQuery) {
    return this.CrudService.findMany('deed_of_assignment', query)
  }

  async findOne(id: number) {
    return this.CrudService.findOne('deed_of_assignment', id)
  }

  async update(id: number, updateData: UpdateTdo) {

    return this.CrudService.update('deed_of_assignment', id, updateData as any)
  }

  async delete(id: number) {
    return this.CrudService.delete('deed_of_assignment', id)
  }
}
