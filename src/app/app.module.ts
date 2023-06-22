import { CacheInterceptor, CacheModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from 'src/auth/auth.module';
import { AgreementsModule } from 'src/models/agreements/agreements.module';
import { TenantsModule } from 'src/models/tenants/tenants.module';
import { UsersModule } from 'src/models/users/users.module';
import { OtpModule } from 'src/otp/otp.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { RedisService } from 'src/redis/redis.service';
import { redisStore } from 'cache-manager-redis-yet';
import { RedisCacheModule } from 'src/redis/redis.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // RedisCacheModule,
    UsersModule,
    AuthModule,
    PrismaModule,
    UsersModule,
    AgreementsModule,
    TenantsModule,
    OtpModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // RedisService,
    { provide: APP_INTERCEPTOR, useClass: CacheInterceptor },
  ],
})
export class AppModule {}
