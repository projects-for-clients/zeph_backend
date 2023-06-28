import { PipeTransform, Injectable, ForbiddenException } from '@nestjs/common';

@Injectable()
export class FileSizeValidationPipe implements PipeTransform {
    transform(value: Express.Multer.File[]) {

        let mbTotalFileSize = 0

        const limitFileSize = 5; // 5MB

        const handleFileSize = (file: Buffer) => {
            const kbSize = Math.floor(file.byteLength / 1000);

            const mbSize = kbSize / 1000
            mbTotalFileSize = Number((mbTotalFileSize + mbSize).toFixed(2))

        }
        Object.values(value).forEach((file: Express.Multer.File) => handleFileSize(file.buffer))


        if (mbTotalFileSize > limitFileSize) {
            const errMessage = `File size too large. Max file size is ${limitFileSize} mb.`

            throw new ForbiddenException(errMessage);
        }

        return value;

    }

}