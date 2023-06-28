import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class FileSizeValidationPipe implements PipeTransform {
    transform(value: any, metadata: any) {
        // "value" is an object containing the file's attributes and metadata

        console.log({ value, metadata })

        const limitFileSize = 1000 * 1000 * 5; // 5MB
        const handleFileSize = (file: Buffer) => {
            console.log(file.byteLength)
            const kbSize = Math.floor(file.byteLength / 1000);

            console.log({ kbSize })

            const mbSize = Math.floor(kbSize / 1000);

            console.log({ mbSize, limitFileSize })

            if (mbSize > limitFileSize) {
                throw new Error(`File size too large. Max file size is ${limitFileSize} bytes.`);
            }
        }
        Object.values(value).forEach((file: Express.Multer.File) => handleFileSize(file.buffer))


        const oneKb = 1000;
        return value.size < oneKb;

    }



}