import { ForbiddenException, Injectable } from "@nestjs/common";
import { TenantDto } from "./dto";
import { PrismaService } from "src/prisma/prisma.service";
import { RedisService } from "src/redis/redis.service";
import * as fs from "fs/promises";
import * as path from "path";

@Injectable()
export class TenantsService {
	constructor(
		// @Inject(CACHE_MANAGER) private readonly cache: Cache,
		private prisma: PrismaService,
		private redis: RedisService,
	) {}

	async create(createTenantDto: TenantDto, files: Array<Express.Multer.File>) {
		// try {
		const folderPath = path.join("uploads", TenantsService.name);
		await fs.mkdir(folderPath, {
			recursive: true,
		});

		const storeFileHandler = async (path: string) => {
			let isError = false;
			for (const key in files) {
				const file = files[key];
				const writeTo = `${folderPath}/${file.originalname}`;

				await fs.writeFile(writeTo, file.buffer).catch(() => {
					isError = true;
				});
			}

			return isError;
		};

		const isError = await storeFileHandler(folderPath);

		console.log({ isError });

		if (!isError) {
			console.log("isError", isError);
			return "2323 world";
		}

		console.log("should not reach here, not stored", isError);

		return "Hello world";
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
