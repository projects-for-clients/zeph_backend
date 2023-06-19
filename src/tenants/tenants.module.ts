import { Module } from '@nestjs/common';
import { TenantsService } from './tenants.service';
import { TenantsController } from './tenants.controller';
import { DrizzleModule } from '../drizzle/drizzle.module';

@Module({
  controllers: [TenantsController],
  imports: [DrizzleModule],
  providers: [TenantsService],
})
export class TenantsModule {}
