import * as path from "path";
import { ForbiddenException, Injectable } from "@nestjs/common";
import { tenancy } from "@prisma/client";
import { Request } from "express";
import * as fs from "fs/promises";
import { PrismaService } from "src/prisma/prisma.service";
import { RedisService } from "src/redis/redis.service";
import { UploadedFilesService } from "src/services/uploadFiles.service";
import { UserRequestService } from 'src/services/userRequest.service';
import { IQuery } from "types/Query";
import { CreateDto, UpdateTenancyTdo } from "./dto";


@Injectable()
export class TenancyService {
	constructor(
		// @Inject(CACHE_MANAGER) private readonly cache: Cache,
		private prisma: PrismaService,
		private uploadFiles: UploadedFilesService,
		private userRequest: UserRequestService

	) { }

	private userId = this.userRequest.getUserId();


	async create(createTenancyDto: CreateDto, files: Express.Multer.File[]) {


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


		const { from, to, key, value, page, limit } = query

		const _from = from ? new Date(from) : new Date(0)
		const _to = to ? new Date(to) : new Date()

		if (from || to) {

			const tenancies = await this.prisma.tenancy.findMany({
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

			//TODO: Catch this error in the general error handler
			const tenancies = await this.prisma.tenancy.findMany({
				where: {
					[key]: {
						contains: value
					}
				}
			})

			console.log({ tenancies })

			return tenancies
		}

		const _page = Number(page) ?? 1
		const _limit = Number(limit) ?? 10

		const dataWithCount = async (): Promise<{ all: tenancy, count: number }> => {
			return this.prisma.$transaction(async (tx) => {
				const all = await tx.tenancy.findMany({
					skip: (_page - 1) * _limit,
					take: _limit,

					include: {
						user: true,
					},


				}
				);

				if (!all) {
					throw new ForbiddenException("No tenancys found")
				}




				const count = await tx.tenancy.count();

				return {
					all,
					count,
				};

			});

		}

		const all = await dataWithCount();


		console.log({ all })

		return all
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
		console.log({ id })
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
