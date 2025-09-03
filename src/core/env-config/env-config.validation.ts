import { plainToInstance, Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, validateSync } from 'class-validator';
import { NODE_ENV } from './env-config.const';

export class EnvironmentVariables {
  @IsEnum(NODE_ENV)
  NODE_ENV: NODE_ENV = NODE_ENV.Development;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  PORT?: number = 3000;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, { skipMissingProperties: false });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
