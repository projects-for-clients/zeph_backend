import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class LogInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LogInterceptor.name);

  constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();

    const { method, url, body, query, params, headers } = req;


    const handleCache = async () => {
      if (['POST', 'PUT', 'DELETE', 'PATCH'].includes(method)) {
        await this.cache.reset();
      }
    };

    handleCache();


    const now = Date.now();
    return next.handle().pipe(
      tap((res) => {
        const response = context.switchToHttp().getResponse();

        const { statusCode } = response;
        const { method, url } = req;
        const contentLength = response.get('content-length');
        const userAgent = req.get('user-agent') || '';

        // this.logger.log(
        //   `${method} ${url} ${statusCode} ${contentLength} - ${userAgent} ${
        //     Date.now() - now
        //   }ms`,
        // );

        // this.logger.debug('Response', JSON.stringify(res));
      }),
    );
  }
}
