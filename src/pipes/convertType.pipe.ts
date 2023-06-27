import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  Logger,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class ConvertTypePipe implements PipeTransform {
  constructor(private readonly options: Record<'key' | 'type', string>[]) {}
  transform(value: any, metadata: ArgumentMetadata) {
    const errors: string[] = [];
    const covertedTypes = this.options.map((option) => {
      const { key, type } = option;
      if (metadata.type === 'body') {
        if (key in value) {
          const numberCheck = type === 'number' && Number(value[key]);

          if (!numberCheck) {
            console.log({ numberCheck });
            return errors.push(`${key} is not a ${type}`);
          }
          return { [key]: numberCheck ?? value[key] };
        }
      }
      return {};
    });

    console.log({ value, metadata });

    console.log('new values', { ...value, ...covertedTypes });
    if (errors.length) {
      // throw new Error(errors.join(', '));
      throw new BadRequestException(errors);
    }

    return { ...value, ...covertedTypes };
  }
}
