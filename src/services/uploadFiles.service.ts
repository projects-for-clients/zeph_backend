import { Injectable } from "@nestjs/common";

import { v2 } from "cloudinary";

@Injectable()
export class UploadedFilesService {


    async uploadBasic() {

        v2.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_PASSWORD
        });

        const upload = await v2.uploader.upload("src/uploads/TenantsService/3000_followers.png",
            { public_id: "olympic_flag" },
            function (error, result) {
                console.log(result, error)
            })
        console.log({ upload })
    }
}

