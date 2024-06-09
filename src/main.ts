import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {CorsOptions} from "@nestjs/common/interfaces/external/cors-options.interface";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const corsOptions: CorsOptions = {
    origin: 'https://master--musical-unicorn-c86815.netlify.app/',
    credentials: true,
  }
  app.enableCors(corsOptions);
  await app.listen(3001, '0.0.0.0');
}
bootstrap();
