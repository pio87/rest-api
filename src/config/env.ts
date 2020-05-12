import * as Joi from '@hapi/joi';
import { v4 } from 'uuid';
import 'joi-extract-type';
import { LoggerLevel, loggerLevels } from '../utils/logger/types';

require('dotenv').config();

const envValidation = Joi.object({
  NODE_ENV: Joi.string().valid('test', 'development', 'production').required(),
  AUTOSTART: Joi.boolean().default(true),
  JWT_SECRET: Joi.string().default(v4()),
  LOG_LEVEL: Joi.string()
    .valid(...(Object.keys(loggerLevels) as LoggerLevel[]))
    .default('info'),
  SERVER: Joi.object({
    PORT: Joi.number().min(1024).max(65535).required(),
    HOST: Joi.string().required()
  }).required()
});

export type EnvVars = Joi.extractType<typeof envValidation>;

const toNumberOrUndefined = (value: string | undefined) =>
  (value === '' || isNaN(Number(value)) ? undefined : Number(value)) as number;

export let env: EnvVars = {
  NODE_ENV: process.env.NODE_ENV as 'test' | 'development' | 'production',
  AUTOSTART: process.env.AUTOSTART === 'true',
  LOG_LEVEL: process.env.LOG_LEVEL as LoggerLevel,
  JWT_SECRET: process.env.JWT_SECRET as string,
  SERVER: {
    PORT: toNumberOrUndefined(process.env.PORT),
    HOST: process.env.HOST as string
  }
};

const { error, value } = envValidation.validate(env);
env = value;

if (error) {
  throw new Error(`Required ENV variable not set, details: ${error.message}`);
}
