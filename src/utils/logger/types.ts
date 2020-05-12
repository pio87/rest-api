/**
 * log levels available in the app logger
 */
export const loggerLevels = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3
};

export type LoggerLevel = keyof typeof loggerLevels;
