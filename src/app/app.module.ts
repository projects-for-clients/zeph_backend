import { CacheModule, CacheInterceptor } from '@nestjs/cache-manager';
import { RequestService } from './../services/request.service';
import { MiddlewareConsumer, Module, NestModule, Scope } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from 'src/auth/auth.module';
import { AgreementsModule } from 'src/models/agreements/agreements.module';
import { TenantsModule } from 'src/models/tenants/tenants.module';
import { UsersModule } from 'src/models/users/users.module';
import { OtpModule } from 'src/otp/otp.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthMiddleware } from 'src/middlewares/auth.middleware';
import { AuthGuard } from 'src/guards/auth.guard';
import { LogInterceptor } from 'src/interceptors/app.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    CacheModule.register({}),

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
    RequestService,
    {
      provide: 'APP_GUARD',
      useClass: AuthGuard,
    },
    {
      provide: 'APP_INTERCEPTOR',
      scope: Scope.REQUEST,
      useClass: LogInterceptor,
    },

    {
      provide: 'APP_INTERCEPTOR',
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
