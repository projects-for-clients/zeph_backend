import { CacheInterceptor, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from 'src/auth/auth.module';
import { AgreementsModule } from 'src/models/agreements/agreements.module';
import { TenantsModule } from 'src/models/tenants/tenants.module';
import { UsersModule } from 'src/models/users/users.module';
import { OtpModule } from 'src/otp/otp.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';
import type { RedisClientOptions } from 'redis';
import { UsersService } from 'src/models/users/users.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // CacheModule.register<any>({
    //   isGlobal: true,
    //   // store: redisStore,
    //   // host: process.env.REDIS_HOST,
    //   // port: process.env.REDIS_PORT,
    //   // ttl: 100,
    // }),

    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: () => {
        return {
          store: redisStore,
          host: process.env.REDIS_HOST,
          port: process.env.REDIS_PORT,
          ttl: 100,
        } as RedisClientOptions;
      },
    }),

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
    UsersService,
    { provide: APP_INTERCEPTOR, useClass: CacheInterceptor },
  ],
})
export class AppModule {}
