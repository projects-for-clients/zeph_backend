import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class FileSizeValidationPipe implements PipeTransform {
    transform(value: any, metadata: any) {
        // "value" is an object containing the file's attributes and metadata

        console.log({ value, metadata })

        const limitFileSize = 1000; // 1kb
        const handleFileSize = (file: Buffer) => {
            console.log(file.byteLength)
            if (file.byteLength > limitFileSize) {
                throw new Error(`File size too large. Max file size is ${limitFileSize} bytes.`);
            }
        }
        Object.values(value).forEach((file: Express.Multer.File) => handleFileSize(file.buffer))


        const oneKb = 1000;
        return value.size < oneKb;

    }



}