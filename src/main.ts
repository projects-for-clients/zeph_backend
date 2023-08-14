import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app/app.module';

async function bootstrap() {
  console.log(process.env)
  const app = await NestFactory.create(AppModule, {

    cors: {

      origin: [process.env.PROD_CLIENT_URL, process.env.DEV_CLIENT_URL],
      credentials: true,
    },
  });
  app.setGlobalPrefix(process.env.API_PREFIX || 'v1');
  app.use(cookieParser());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  const PORT = process.env.PORT || 4000;

  await app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}
bootstrap();
