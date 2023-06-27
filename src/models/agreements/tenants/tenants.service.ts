import { Injectable } from '@nestjs/common';
import { TenantDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { RedisService } from 'src/redis/redis.service';
import * as fs from 'fs/promises';
import * as path from 'path';

@Injectable()
export class TenantsService {
  constructor(
    // @Inject(CACHE_MANAGER) private readonly cache: Cache,
    private prisma: PrismaService,
    private redis: RedisService,
  ) {}

  async create(createTenantDto: TenantDto, file: Express.Multer.File) {
    console.log({ createTenantDto, file });

    const folderPath = path.join('uploads', 'tenants');
    await fs
      .mkdir(folderPath, {
        recursive: true,
      })
      .then((res) => {
        console.log("not create")
        console.log({ res });
      })
      .catch((e) => {
        console.log("create now ")
        console.log({ e });
      });

    console.log({ folderPath });

    // const readFolder = await fs.mkdir(folderPath).catch(async (e) => {
    //   console.log({ e });
    //   const mkdir = await fs.mkdir(folderPath, {
    //     recursive: true,
    //   });
    //   console.log({ mkdir });

    //   return 'File created';
    // });

    // console.log({ folderPath, readFolder });

    return 'Hello';
    const toUploadsFolder = fs.mkdir(`uploads/` + folderPath, {
      recursive: true,
    });
    const writeTo = `${toUploadsFolder}/${file.originalname}`;

    const stored = await fs.writeFile(writeTo, file.buffer);

    return `This action adds a new tenant`;
  }

  async findAll() {
    return `This action returns all tenants`;
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
