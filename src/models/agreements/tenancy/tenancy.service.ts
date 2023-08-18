import { CrudService } from 'src/services/crud.service';
import * as path from "path";
import { ForbiddenException, Injectable } from "@nestjs/common";
import * as fs from "fs/promises";
import { PrismaService } from "src/prisma/prisma.service";

import { UploadedFilesService } from "src/services/uploadFiles.service";
import { UserRequestService } from 'src/services/userRequest.service';
import { IQuery } from "types/types";
import { CreateDto, UpdateTenancyTdo } from "./dto";


@Injectable()
export class TenancyService {
	constructor(
		// @Inject(CACHE_MANAGER) private readonly cache: Cache,
		private prisma: PrismaService,
		private uploadFiles: UploadedFilesService,
		private userRequest: UserRequestService,
		private CrudService: CrudService

	) { }

	private userId = this.userRequest.getUserId();



	async create(createTenancyDto: CreateDto, files: Express.Multer.File[], req: any) {


		const folderPath = path.join("uploads", TenancyService.name);
		const currDir = path.join(process.cwd(), folderPath);

		await fs.mkdir(folderPath, {
			recursive: true,
		});

		const cleanUpPaths = []

		// rome-ignore lint/suspicious/noExplicitAny: <explanation>
		const uploadedFiles: any[] = []
		const storeFileHandler = async (path: string) => {
			let isError = false;

			for (const key in files) {
				const file = files[key];
				const writeTo = `${path}/${file.originalname}`;

				cleanUpPaths.push(writeTo);
				await fs.writeFile(writeTo, file.buffer).catch(() => {
					isError = true;
				});


				const toUpload = await this.uploadFiles.uploadBasic(`${currDir}/${file.originalname}`, `${folderPath}/users/${this.userId}`)

				uploadedFiles.push(toUpload);


			}

			return isError;
		};



		try {

			await storeFileHandler(folderPath);

			const executed = await Promise.all(uploadedFiles.map(async (file) => {
				return (await file)()
			}));

			cleanUpPaths.map(async (writeTo) => {
				await fs.unlink(writeTo)
			})


			const relevant_documents: string[] = executed.map((fileData) => fileData.secure_url)



			const tenancy = await this.prisma.tenancy.create({
				data: {
					...createTenancyDto,
					relevant_documents,
					userId: this.userId
				},
			});



			if (!tenancy) { throw new ForbiddenException('Unable to create Tenancy'); }

			return tenancy;
		}
		catch (err) {

			console.log({ err })
			throw new ForbiddenException("Error while storing files");
		}

	}

	async findAll(query: IQuery) {


		const { from, to, key, value, page, take, perPage } = query

		const _from = from ? new Date(from) : new Date(0)
		const _to = to ? new Date(to) : new Date()

		const _page = Number(page) || 1
		const _take = Number(take) || 10
		const _perPage = Number(perPage) || 10

		if (from || to) {

			const tenancies = this.prisma.tenancy.findMany({
				skip: (_page - 1) * _perPage,
				take: _take,
				where: {
					created_at: {
						gte: _from,
						lte: _to
					}
				}
			})

			return tenancies
		}

		if (key && value) {

			const tenancies = this.prisma.tenancy.findMany({
				skip: (_page - 1) * _perPage,
				take: _take,
				where: {
					[key]: {
						contains: value
					}
				}
			})

			return tenancies
		}






		// const data = await this.prisma.tenancy.findMany({
		// 	skip: (_page - 1) * _perPage,
		// 	take: _take,
		// })

		const data = await this.CrudService.findMany('tenancy')

		const count = await this.prisma.tenancy.count()

		console.log("data from crud", data)


		return {
			data,
			count,
			page: _page,
			take: _take,
			perPage: _perPage
		}

	}

	async findOne(id: number) {
		const one = await this.prisma.tenancy.findUnique({
			where: {
				id,
			},
		});

		if (!one) {

			throw new ForbiddenException("Tenancy not found")
		}

		return one
	}

	async update(id: number, updateTenancyDto: UpdateTenancyTdo) {
		const find = await this.prisma.tenancy.findUnique({
			where: {
				id,
			},
		});

		if (!find) {
			throw new ForbiddenException('Tenancy not found');
		}

		const update = await this.prisma.tenancy.update({
			where: {
				id,
			},
			data: {
				...find,
				...updateTenancyDto,
			},
		});

		if (!update) {
			throw new ForbiddenException("Unable to update")
		}

		return update
	}

	async delete(id: number) {
		const remove = await this.prisma.tenancy.delete({
			where: {
				id,
			},
		});

		if (!remove) {
			throw new ForbiddenException("Unable to delete")
		}

		return remove
	}
}
