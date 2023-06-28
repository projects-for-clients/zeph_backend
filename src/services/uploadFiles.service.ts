import { Injectable } from "@nestjs/common";
import * as fs from "fs";
import { google } from "googleapis";
import { GoogleAuth } from "google-auth-library";

@Injectable()
export class UploadedFilesService {
	async uploadBasic() {
		const auth = new GoogleAuth({
			scopes: "https://www.googleapis.com/auth/drive",
		});
		const service = google.drive({ version: "v3", auth });
		const requestBody = {
			name: "photo.jpg",
			fields: "id",
		};
		const media = {
			mimeType: "image/jpeg",
			body: fs.createReadStream("files/photo.jpg"),
		};
		try {
			const file = await service.files.create({
				requestBody,
				media: media,
			});
			console.log("File Id:", file.data.id);
			return file.data.id;
		} catch (err) {
			console.log({ err });
			throw err;
		}
	}
}
