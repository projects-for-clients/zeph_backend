import { Injectable } from '@nestjs/common';
import { TenantDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { RedisService } from 'src/redis/redis.service';
import * as fs from 'fs/promises';
import path from 'path';

@Injectable()
export class TenantsService {
  constructor(
    // @Inject(CACHE_MANAGER) private readonly cache: Cache,
    private prisma: PrismaService,
    private redis: RedisService,
  ) {}

  async create(createTenantDto: TenantDto, file: Express.Multer.File) {
    console.log({ createTenantDto, file });

    console.log('file:', fs);

    const folderPath = path.join(__dirname, 'relative/path/to/folder');

    // Create the folder if it doesn't exist
    if (!fs.readdir(folderPath)) {
      fs.mkdir(folderPath, { recursive: true });
      console.log('Folder created:', folderPath);
    } else {
      console.log('Folder already exists:', folderPath);
    }

    const writeTo = path.join(folderPath, file.originalname);

    const stored = await fs.writeFile(writeTo, file.buffer);

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
