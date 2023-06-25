import { UsersModule } from 'src/models/users/users.module';
import { MiddlewareConsumer, Module, NestModule, Scope } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthMiddleware } from 'src/middlewares/auth.middleware';
import { AuthGuard } from 'src/guards/auth.guard';
import { LogInterceptor } from 'src/interceptors/app.interceptor';
import { SharedModule } from 'src/shared/shared.module';
import { TenantsModule } from 'src/models/agreements/tenants/tenants.module';
import { LeaseAgreementsModule } from 'src/lease_agreements/lease_agreements.module';
import { AuthModule } from 'src/auth/auth.module';
import { RedisCacheModule } from 'src/redis/redis.module';
import { LeasesModule } from 'src/models/agreements/leases/leases.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RedisCacheModule,
    UsersModule,
    AuthModule,
    SharedModule,
    TenantsModule,
    LeasesModule,
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
