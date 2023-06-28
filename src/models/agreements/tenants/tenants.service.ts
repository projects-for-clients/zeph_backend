import { UserRequestService } from 'src/services/userRequest.service';
import { ForbiddenException, Injectable } from "@nestjs/common";
import { TenantDto } from "./dto";
import { PrismaService } from "src/prisma/prisma.service";
import { RedisService } from "src/redis/redis.service";
import * as fs from "fs/promises";
import * as path from "path";
import { UploadedFilesService } from "src/services/uploadFiles.service";
import { UploadApiResponse } from 'cloudinary';

@Injectable()
export class TenantsService {
	constructor(
		// @Inject(CACHE_MANAGER) private readonly cache: Cache,
		private prisma: PrismaService,
		private redis: RedisService,
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

		const uploadedFiles: any[] = []
		const storeFileHandler = async (path: string) => {
			let isError = false;

			for (const key in files) {
				const file = files[key];
				const writeTo = `${path}/${file.originalname}`;

				await fs.writeFile(writeTo, file.buffer).catch(() => {
					isError = true;
				});


				uploadedFiles.push(await this.uploadFiles.uploadBasic(currDir + '/' + file.originalname, `${folderPath}/users/${this.userId}`));

				// await fs.unlink(writeTo).catch(() => {
				// 	isError = true;
				// }
				// );


			}

			return isError;
		};

		console.log({ uploadedFiles })

		const executed = await Promise.all(uploadedFiles.map(async (upload) => {
			return await upload();
		}));

		console.log({ executed })

		const isError = await storeFileHandler(folderPath);


		if (isError) {
			console.log("Error while storing files")
			throw new ForbiddenException("Error while storing files");
		}

		console.log({ uploadedFiles })

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
