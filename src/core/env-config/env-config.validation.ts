import { plainToInstance, Transform, Type } from 'class-transformer';
import { IsArray, IsEnum, IsNumber, IsOptional, IsString, validateSync } from 'class-validator';
import { NODE_ENV } from './env-config.const';

export class EnvironmentVariables {
  @IsEnum(NODE_ENV)
  NODE_ENV: NODE_ENV = NODE_ENV.Development;

  @Type(() => Number)
  @IsNumber()
  PORT: number;

  @Transform(({ value }) =>  value?.split(',').map((v) => v.trim()))
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  CORS_ORIGIN?: string[];
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
