/* eslint-disable @typescript-eslint/no-unused-vars */

import { Injectable } from "@nestjs/common";
import { CrudService } from 'src/services/crud.service';

import { IQuery } from "types/types";
import { CreateDto, UpdateTenancyTdo } from "./dto";


@Injectable()
export class TenancyService {
	constructor(
		private CrudService: CrudService
	) { }


	async create(createTenancyDto: CreateDto, files: Express.Multer.File[]) {


		return this.CrudService.create('tenancy', createTenancyDto as any, files)


	}

	async findAll(query: IQuery) {


		return this.CrudService.findMany('tenancy', query)

	}

	async findOne(id: number) {
		return this.CrudService.findOne('tenancy', id)
	}

	async update(id: number, updateTenancyDto: UpdateTenancyTdo) {

		return this.CrudService.update('tenancy', id, updateTenancyDto)


	}

	async delete(id: number) {

		return this.CrudService.delete('tenancy', id)


	}
}
