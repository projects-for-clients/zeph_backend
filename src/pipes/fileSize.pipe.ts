import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class FileSizeValidationPipe implements PipeTransform {
    transform(value: any, metadata: any) {
        // "value" is an object containing the file's attributes and metadata

        console.log({ value, metadata })

        const limitFileSize = 1024 * 1024 * 5; // 5MB
        const handleFileSize = (file: Buffer) => {
            console.log(file.byteLength)

            const getKB = Math.floor(file.byteLength);

            console.log({ getKB, limitFileSize })

            if (getKB > limitFileSize) {
                throw new Error(`File size too large. Max file size is ${limitFileSize} bytes.`);
            }
        }
        Object.values(value).forEach((file: Express.Multer.File) => handleFileSize(file.buffer))


        const oneKb = 1000;
        return value.size < oneKb;

    }



}