import { Injectable } from "@nestjs/common";

import { v2 } from "cloudinary";

@Injectable()
export class UploadedFilesService {

    async uploadBasic(file: string, filePath: string) {

        v2.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_PASSWORD
        });


        const execute = async () => {

            const upload = await v2.uploader.upload(file,
                {
                    folder: filePath,
                    use_filename: true,
                    unique_filename: true,
                    resource_type: "auto",
                },
            );


            return upload;
        }

        // const result =  execute(); //makes it to run in the background, very fast


        //return result

        return execute
    }
}

