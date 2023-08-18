import { MiddlewareConsumer, Module, NestModule, Scope } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from 'src/auth/auth.module';
import { AuthGuard } from 'src/guards/auth.guard';
import { LogInterceptor } from 'src/interceptors/app.interceptor';
import { AuthMiddleware } from 'src/middlewares/auth.middleware';
import { DeedOfAssignmentModule } from 'src/models/agreements/deed_of_assignment/deed_of_assignment.module';
import { LeaseModule } from 'src/models/agreements/lease/lease.module';
import { LoanModule } from 'src/models/agreements/loan/loan.module';
import { PowerOfAttorneyModule } from 'src/models/agreements/power_of_attorney/power_of_attorney.module';
import { SaleModule } from 'src/models/agreements/sale/sale.module';
import { TenancyModule } from 'src/models/agreements/tenancy/tenancy.module';
import { UserModule } from 'src/models/user/user.module';
import { RedisCacheModule } from 'src/redis/redis.module';
import { SharedModule } from 'src/shared/shared.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MockController } from 'src/mock/mock.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RedisCacheModule,
    UserModule,
    AuthModule,
    SharedModule,
    TenancyModule,
    LeaseModule,
    DeedOfAssignmentModule,
    LoanModule,
    SaleModule,
    PowerOfAttorneyModule
  ],
  controllers: [AppController, MockController],
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
