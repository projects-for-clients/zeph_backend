import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import * as cookieParser from "cookie-parser";
import { AppModule } from "./app/app.module";

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		cors: {
			origin: [process.env.CLIENT_URL, "http://localhost:3000"],

			credentials: true,
		},
	});

	app.setGlobalPrefix(process.env.API_PREFIX || "v1");
	app.use(cookieParser());

	const config = new DocumentBuilder()
		.setTitle("Zeph Chambers")
		.setDescription("Zeph Chambers API")
		.setVersion("1.0")
		.addTag("Zeph Chambers")
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup("swagger", app, document);

	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
		}),
	);

	const PORT = process.env.PORT || 4000;

	await app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}
bootstrap();
