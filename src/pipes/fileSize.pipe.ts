import { PipeTransform, Injectable, ArgumentMetadata, ForbiddenException } from '@nestjs/common';

@Injectable()
export class FileSizeValidationPipe implements PipeTransform {
    transform(value: any, metadata: any) {
        // "value" is an object containing the file's attributes and metadata

        let mbTotalFileSize = 0

        const limitFileSize = 1; // 5MB

        const handleFileSize = (file: Buffer) => {
            const kbSize = Math.floor(file.byteLength / 1000);

            const mbSize = kbSize / 1000
            mbTotalFileSize = Number((mbTotalFileSize + mbSize).toFixed(2))

        }
        Object.values(value).forEach((file: Express.Multer.File) => handleFileSize(file.buffer))

        console.log({ mbTotalFileSize, limitFileSize })

        if (mbTotalFileSize > limitFileSize) {
            const errMessage = `File size too large. Max file size is ${limitFileSize} bytes.`

            throw new ForbiddenException(errMessage);
        }


        const oneKb = 1000;
        return value.size < oneKb;

    }



}