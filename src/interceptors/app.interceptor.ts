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
    console.log(req.cookies);
    console.log(req);

    const handleCache = async () => {
      if (method === 'POST') {
        await this.cache.reset();
      }
    };

    handleCache();

    // this.logger.verbose('Request', JSON.stringify(headers));

    // this.logger.log(`
    //   ${method} ${url} ${JSON.stringify(body)} ${JSON.stringify(
    //   query,
    // )} ${JSON.stringify(params)}: ${LogInterceptor.name}
    //   ${(context.getClass().name, context.getHandler().name)}

    // `);

    // this.logger.debug(this.requestService.getUserId());

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
