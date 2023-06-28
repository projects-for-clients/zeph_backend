import { Global, Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthService } from "src/auth/auth.service";
import { PrismaService } from "src/prisma/prisma.service";
import { RedisService } from "src/redis/redis.service";
import { EmailService } from "src/services/email.service";
import { UploadedFilesService } from "src/services/uploadFiles.service";
import { UserRequestService } from "src/services/userRequest.service";

@Global()
@Module({
	providers: [
		UserRequestService,
		AuthService,
		JwtService,
		RedisService,
		PrismaService,
		EmailService,
		UploadedFilesService,
	],
	exports: [
		UserRequestService,
		RedisService,
		PrismaService,
		JwtService,
		AuthService,
		EmailService,
		UploadedFilesService,
	],
})
export class SharedModule { }
