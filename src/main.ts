import { setupApp } from '@core/bootstrap-configs/app.config';
import { EnvConfigService } from '@core/env-config/env-config.service';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  await setupApp(app as NestExpressApplication);

  const envConfigService = app.get(EnvConfigService);
  const port = envConfigService.getPort();

  await app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

bootstrap().catch((error) => {
  console.error('Application failed to start:', error);
  process.exit(1);
});
