import { Injectable } from "@nestjs/common";
import * as fs from "fs";
import { google } from "googleapis";
import { GoogleAuth } from "google-auth-library";
import  cloudinary from "cloudinary";

@Injectable()
export class UploadedFilesService {
	// async uploadBasic() {
	// 	const auth = new GoogleAuth({
    //         scopes: "https://www.googleapis.com/auth/drive",
    //         keyFile: "src/credentials/googleKey.json",
	// 	});
	// 	const service = google.drive({ version: "v3", auth });
	// 	const requestBody = {
	// 		name: "3000_followers.jpg",
	// 		// fields: "id",
    //         // parents: ["uploads"]
	// 	};
	// 	const media = {
	// 		mimeType: "image/png",
	// 		body: fs.createReadStream("uploads/TenantsService/3000_followers.png"),
	// 	};
	// 	try {
	// 		const file = await service.files.create({
	// 			requestBody,
	// 			media: media,
	// 		});
	// 		console.log("File Id:", file.data.id);
	// 		return file.data.id;
	// 	} catch (err) {
	// 		console.log({ err });
	// 		throw err;
	// 	}
	// }

    async uploadBasic() { 
        cloudinary.v2.uploader.upload("src/uploads/TenantsService/3000_followers.png",
  { public_id: "olympic_flag" }, 
  function(error, result) {console.log(result); });
    }
}

