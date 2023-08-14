import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      // origin: process.env.NODE_ENV === 'production' ? process.env.CLIENT_URL : 'http://localhost:3000',

      origin: [process.env.CLIENT_URL, 'http://localhost:3000'],
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
