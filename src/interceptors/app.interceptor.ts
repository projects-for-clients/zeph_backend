import { RequestService } from 'src/services/request.service';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LogInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LogInterceptor.name);

  constructor(private readonly requestService: RequestService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();

    console.log({ req });

    const { method, url, body, query, params } = req;

    this.logger.log(`
      ${method} ${url} ${JSON.stringify(body)} ${JSON.stringify(
      query,
    )} ${JSON.stringify(params)}: ${LogInterceptor.name}
      ${(context.getClass().name, context.getHandler().name)}
    
    `);

    this.logger.debug(this.requestService.getUserId());

    const now = Date.now();
    return next.handle().pipe(
      tap((res) => {
        const response = context.switchToHttp().getResponse();

        const { statusCode } = response;
        const { method, url } = req;
        const contentLength = response.get('content-length');
        const userAgent = req.get('user-agent') || '';

        this.logger.log(
          `${method} ${url} ${statusCode} ${contentLength} - ${userAgent} ${
            Date.now() - now
          }ms`,
        );

        this.logger.debug('Response', JSON.stringify(res));
      }),
    );
  }
}
