import { MiddlewareConsumer, Module, NestModule, Scope } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthMiddleware } from 'src/middlewares/auth.middleware';
import { AuthGuard } from 'src/guards/auth.guard';
import { LogInterceptor } from 'src/interceptors/app.interceptor';
import { SharedModule } from 'src/shared/shared.module';
import { TenantsModule } from 'src/models/tenants/tenants.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { RedisService } from 'src/redis/redis.service';
import { RequestService } from 'src/services/request.service';
import { AuthController } from 'src/auth/auth.controller';
import { TenantsController } from 'src/models/tenants/tenants.controller';
import { LeaseAgreementsController } from 'src/lease_agreements/lease_agreements.controller';
import { LeaseAgreementsModule } from 'src/lease_agreements/lease_agreements.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SharedModule,
    TenantsModule,
    PrismaModule,
    LeaseAgreementsModule,
  ],
  controllers: [AppController, AuthController],
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
