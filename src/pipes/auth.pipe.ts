import { ArgumentMetadata, Injectable, PipeTransform, Logger } from '@nestjs/common';

@Injectable()
export class AuthPipe implements PipeTransform {
  private readonly logger = new Logger(AuthPipe.name);
  transform(value: any, metadata: ArgumentMetadata) {
    this.logger.log(AuthPipe.name, value, metadata);
    return value;
  }
}
