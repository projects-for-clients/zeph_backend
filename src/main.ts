import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule, { cors: {credentials: true, origin: process.env.CLIENT_URL });
  const app = await NestFactory.create(AppModule, {
    cors: {
      credentials: true,
    },
  });
  app.setGlobalPrefix(process.env.API_PREFIX || 'v1');
  app.use(cookieParser(process.env.COOKIE_SECRET));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  const PORT = process.env.PORT || 4000;

  await app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}
bootstrap();
