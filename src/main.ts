import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { Logger as NestLogger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  return app.getUrl();
}

(async (): Promise<void> => {
  try {
    const url = await bootstrap();
    NestLogger.log(url, 'Server Ready');
  } catch (error) {
    NestLogger.error(error, 'Server Error');
  }
})();
