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
    const folderPath = path.join('uploads', TenantsService.name);
    await fs.mkdir(folderPath, {
      recursive: true,
    });

    const writeTo = `${folderPath}/${file.originalname}`;

    console.log({writeTo})

    const stored = await fs.writeFile(writeTo, file.buffer).catch((err) => {
      console.log(err);
      return 'stored';
    });

    console.log({ stored });

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
