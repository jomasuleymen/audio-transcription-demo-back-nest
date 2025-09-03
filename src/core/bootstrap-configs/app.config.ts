import { EnvConfigService } from '@core/env-config/env-config.service';
import { NestExpressApplication } from '@nestjs/platform-express';
import bodyParser from 'body-parser';

export const setupApp = async (app: NestExpressApplication) => {
  setupBodyParser(app);
  setupSecurity(app);
};

const setupBodyParser = (app: NestExpressApplication) => {
  app.set('query parser', 'extended');
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
};

const setupSecurity = (app: NestExpressApplication) => {
  const envConfigService = app.get(EnvConfigService);
  app.enableCors({ credentials: true, origin: envConfigService.getCorsOrigin() });
};
