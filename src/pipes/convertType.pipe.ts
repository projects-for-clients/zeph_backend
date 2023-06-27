import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  Logger,
} from '@nestjs/common';

@Injectable()
export class ConvertTypePipe implements PipeTransform {
  constructor(private readonly options: Record<'key' | 'type', string>[]) {}
  transform(value: any, metadata: ArgumentMetadata) {
    this.options.find((option) => console.log(option));

    console.log({ key, type });
    console.log({ value, metadata });
  }
}
