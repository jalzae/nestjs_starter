import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import * as cors from 'cors';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(cors({
    methods: 'GET,PUT,POST,DELETE',
    credentials: true,
  }));

  await app.listen(3000);
}
bootstrap();
