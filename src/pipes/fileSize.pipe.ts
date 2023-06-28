import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class FileSizeValidationPipe implements PipeTransform {
    transform(value: any, metadata: any) {
        // "value" is an object containing the file's attributes and metadata

        console.log({ value, metadata })

        console.log(metadata.metatype)

        metadata.metatype[0].forEach((element: any) => console.log({ element }))

        const oneKb = 1000;
        return value.size < oneKb;

    }



}