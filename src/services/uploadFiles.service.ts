import { Injectable } from "@nestjs/common";

import { v2 } from "cloudinary";

@Injectable()
export class UploadedFilesService {

    constructor(private filePath: string, private fileName: string) { }

    async uploadBasic() {

        v2.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_PASSWORD
        });

        const upload = await v2.uploader.upload("https://media.licdn.com/dms/image/D4D03AQElOh7PO4fxEw/profile-displayphoto-shrink_400_400/0/1669276312114?e=1693440000&v=beta&t=5wEu-eidijPpzNZ4_tX3j9ODN3MwqeMOs_EGv1sZP8s",
            {
                folder: `uploads/${this.filePath}`,
                use_filename: true,
                unique_filename: true
            },
        );

        return upload;
    }
}

