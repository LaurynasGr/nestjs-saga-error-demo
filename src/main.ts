import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3200);

  // The below code would prevent the app from crashing but it would also prevent
  // any saga from ever being triggered again after the first time it throws
  // process.on('uncaughtException', (err) => {
  //   console.error('Application encountered an uncaught exception:', err);
  // });
}
bootstrap();
