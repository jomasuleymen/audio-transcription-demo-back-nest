import { EnvConfigService } from '@core/env-config/env-config.service';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  const logger = app.get<Logger>(Logger);

  const envConfigService = app.get(EnvConfigService);
  const port = envConfigService.getPort();

  await app.listen(port, () => {
    logger.log(`Server is running on port ${port}`);
  });
}

bootstrap().catch((error) => {
  console.error('Application failed to start:', error);
  process.exit(1);
});
