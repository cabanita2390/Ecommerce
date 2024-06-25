import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerGlobalMiddleware } from './middlewares/Logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.use(LoggerGlobalMiddleware);
  await app.listen(3000);
}
bootstrap();
