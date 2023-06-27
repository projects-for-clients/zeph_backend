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
    const covertedTypes = this.options.map((option) => {
      const { key, type } = option;
      if (metadata.type === 'body') {
        if (key in value) {
          return { [key]: type === 'number' ? Number(value[key]) : value[key] };
        }
      }
      return {};
    });

    console.log({ covertedTypes })

    console.log({ value, metadata });
  }
}
