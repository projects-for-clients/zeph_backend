import { RequestService } from './../services/request.service';
import { MiddlewareConsumer, Module, NestModule, Scope } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from 'src/auth/auth.module';
import { AgreementsModule } from 'src/models/agreements/agreements.module';
import { TenantsModule } from 'src/models/tenants/tenants.module';
import { OtpModule } from 'src/otp/otp.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthMiddleware } from 'src/middlewares/auth.middleware';
import { AuthGuard } from 'src/guards/auth.guard';
import { LogInterceptor } from 'src/interceptors/app.interceptor';
import { RedisCacheModule } from 'src/redis/redis.module';
import { RedisService } from 'src/redis/redis.service';
import { UsersService } from 'src/models/users/users.service';
import { UsersController } from 'src/models/users/users.controller';
import { TenantsService } from 'src/models/tenants/tenants.service';
import { TenantsController } from 'src/models/tenants/tenants.controller';
import { SharedModule } from 'src/shared/shared.module';
import { UsersModule } from 'src/models/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // RedisCacheModule,
    UsersModule,
    AuthModule,
    PrismaModule,
    AgreementsModule,
    OtpModule,
    SharedModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'APP_GUARD',
      useClass: AuthGuard,
    },
    {
      provide: 'APP_INTERCEPTOR',
      scope: Scope.REQUEST,
      useClass: LogInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
