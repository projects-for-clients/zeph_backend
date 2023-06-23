import { Injectable } from '@nestjs/common';
import { TenantDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TenantsService {
  constructor(
    // @Inject(CACHE_MANAGER) private readonly cache: Cache,
    private prisma: PrismaService,
  ) {}

  async create(createTenantDto: TenantDto) {
    console.log({ createTenantDto });
    const tenant = await this.prisma.tenants.create({
      data: {
        ...createTenantDto,
      },
    });

    return tenant;
  }

  findAll() {
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
