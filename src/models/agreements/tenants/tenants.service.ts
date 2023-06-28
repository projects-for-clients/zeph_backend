import { UserRequestService } from 'src/services/userRequest.service';
import { ForbiddenException, Injectable } from "@nestjs/common";
import { TenantDto } from "./dto";
import { PrismaService } from "src/prisma/prisma.service";
import { RedisService } from "src/redis/redis.service";
import * as fs from "fs/promises";
import * as path from "path";
import { UploadedFilesService } from "src/services/uploadFiles.service";


@Injectable()
export class TenantsService {
	constructor(
		// @Inject(CACHE_MANAGER) private readonly cache: Cache,
		private prisma: PrismaService,
		private uploadFiles: UploadedFilesService,
		private userRequest: UserRequestService

	) { }

	private userId = this.userRequest.getUserId();


	async create(createTenantDto: TenantDto, files: Array<Express.Multer.File>) {


		const folderPath = path.join("uploads", TenantsService.name);
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


			const tenant = await this.prisma.tenants.create({
				data: {
					...createTenantDto,
					relevant_documents,
					userId: this.userId
				},
			});



			if (!tenant) throw new ForbiddenException('Unable to create lease');

			return tenant;
		}
		catch (err) {

			console.log({ err })
			throw new ForbiddenException("Error while storing files");
		}

	}

	async findAll() {
		return await this.prisma.tenants.findMany();
	}

	async findOne(id: number) {
		return await this.prisma.leases.findUnique({
			where: {
				id,
			},
		});
	}

	async update(id: number, updateTenantDto: TenantDto) {
		const find = await this.prisma.tenants.findUnique({
			where: {
				id,
			},
		});

		if (!find) {
			throw new ForbiddenException('Tenant not found');
		}

		return await this.prisma.tenants.update({
			where: {
				id,
			},
			data: {
				...find,
				...updateTenantDto,
			},
		});
	}

	async remove(id: number) {
		return await this.prisma.tenants.delete({
			where: {
				id,
			},
		});
	}
}
