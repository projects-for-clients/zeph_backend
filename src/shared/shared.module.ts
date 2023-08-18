import { Global, Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthService } from "src/auth/auth.service";
import { PrismaService } from "src/prisma/prisma.service";
import { RedisService } from "src/redis/redis.service";
import { CrudService } from "src/services/crud.service";
import { EmailService } from "src/services/email.service";
import { OtpService } from "src/services/otp.service";
import { UploadedFilesService } from "src/services/uploadFiles.service";
import { UserRequestService } from "src/services/userRequest.service";

@Global()
@Module({
	providers: [
		UserRequestService,
		AuthService,
		CrudService,
		JwtService,
		RedisService,
		PrismaService,
		EmailService,
		UploadedFilesService,
		OtpService,
	],
	exports: [
		UserRequestService,
		RedisService,
		PrismaService,
		CrudService,
		JwtService,
		AuthService,
		EmailService,
		UploadedFilesService,
		OtpService,
	],
})
export class SharedModule { }
