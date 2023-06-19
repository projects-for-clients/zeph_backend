import { Inject, Injectable } from '@nestjs/common';
import { TenantDto } from './dto';
import { PG_CONNECTION } from '../drizzle/constants';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { tenancy } from 'src/drizzle/schema';

@Injectable()
export class TenantsService {
  constructor(
    @Inject(PG_CONNECTION)
    private conn: PostgresJsDatabase<Record<string, never>>,
  ) {}

  async create(createTenantDto: TenantDto) {
    const tenant = await this.conn
      .insert(tenancy)
      .values({
        ...createTenantDto,
        agreement_id: 1,
      })
      .returning();

    return tenant;
  }

  // async create(createTenantDto: TenantDto) {
  //   // const agreement = await this.conn.insert(agreements).values({
  //   //   user_id: 1,
  //   // });

  //   // console.log({ agreement });

  //   const tenant = await this.conn
  //     .insert(tenancy)
  //     .values({
  //       ...createTenantDto,
  //       agreement_id: 28,
  //     })
  //     .execute();

  //   console.log({ tenant });

  //   return tenant;
  // }

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
