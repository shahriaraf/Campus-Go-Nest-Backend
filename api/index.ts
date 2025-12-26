/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from '../src/app.module';
import express, { Request, Response } from 'express';
import { ValidationPipe } from '@nestjs/common';

// 1. Create Express instance outside the handler
const server = express();

// 2. Cache the Nest Promise
let nestHandler: Promise<any>;
let isInitialized = false;

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

  // 3. Add same settings as main.ts
  app.enableCors({
    origin: '*',
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  await app.init();
  return server;
};

// 4. Export the Vercel Handler
export default async function handler(req: Request, res: Response) {
  if (!isInitialized) {
    isInitialized = true;
    nestHandler = bootstrap();
  }
  // Wait for Nest to be ready
  await nestHandler;
  // Pass request to Express
  server(req, res);
}