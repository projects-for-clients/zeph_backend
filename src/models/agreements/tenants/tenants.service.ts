import { ForbiddenException, Injectable } from "@nestjs/common";
import { TenantDto } from "./dto";
import { PrismaService } from "src/prisma/prisma.service";
import { RedisService } from "src/redis/redis.service";
import * as fs from "fs/promises";
import * as path from "path";
import { Buffer } from "buffer";
import { UploadedFilesService } from "src/services/uploadFiles.service";

@Injectable()
export class TenantsService {
	constructor(
		// @Inject(CACHE_MANAGER) private readonly cache: Cache,
		private prisma: PrismaService,
		private redis: RedisService,
		private uploadFiles: UploadedFilesService
	) { }

	async create(createTenantDto: TenantDto, files: Array<Express.Multer.File>) {
		// try {
		const folderPath = path.join("uploads", TenantsService.name);
		const currDir = path.join(process.cwd(), folderPath);

		await fs.mkdir(folderPath, {
			recursive: true,
		});

		const storeFileHandler = async (path: string) => {
			let isError = false;
			for (const key in files) {
				const file = files[key];
				const writeTo = `${path}/${file.originalname}`;






				const stored = await fs.writeFile(writeTo, file.buffer).catch(() => {
					isError = true;
				});

				const base64String = Buffer.from(file.buffer).toString("base64");
				console.log({ currDir })

				const uploadToCDN = await this.uploadFiles.uploadBasic(currDir + '/' + file.originalname, folderPath).catch((e) => {
					console.log({ e })
					isError = true;
				}
				);

			}

			return isError;
		};

		const isError = await storeFileHandler(folderPath);




		if (isError) {
			throw new ForbiddenException("Error while storing files");
		}

		return "Stored the service";
	}

	async findAll() {
		return "This action returns all tenants";
	}

	findOne(id: number) {
		return `This action returns a #${id} tenant`;
	}

	update(id: number, updateTenantDto: TenantDto) {
		return `This action updates a #${id} tenant`;
	}

	remove(id: number) {
		return `This action removes a #${id} tenant`;
	}
}
