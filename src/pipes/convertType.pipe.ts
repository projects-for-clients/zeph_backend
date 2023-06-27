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
    const convertedTypes = this.options.map((option) => {
      const { key, type } = option;
      if (metadata.type === 'body') {
        if (key in value) {
          const numberCheck = type === 'number' && Number(value[key]);

          if (!numberCheck) {
            return errors.push(`${key} is not a ${type}`);
          }

          return { [key]: numberCheck };
        }
      }
    });

    const updatedValue = {
      ...value,
      ...convertedTypes.reduce(
        (acc: any, curr: any) => ({ ...acc, ...curr }),
        {},
      ),
    };



    console.log('new types', { value, convertedTypes });

    if (errors.length) {
      // throw new Error(errors.join(', '));
      throw new BadRequestException(errors);
    }

    return { ...updatedValue };
  }
}
