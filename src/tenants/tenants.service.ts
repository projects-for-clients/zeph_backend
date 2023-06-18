import { Injectable } from '@nestjs/common';
import { TenantDto } from './dto';
import { PG_CONNECTION } from '../drizzle/constants';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';

@Injectable()
export class TenantsService {
  constructor(
    @Inject(PG_CONNECTION)
    private conn: PostgresJsDatabase<Record<string, never>>,
  ) {}
  create(createTenantDto: TenantDto) {
    return 'This action adds a new tenant';
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
