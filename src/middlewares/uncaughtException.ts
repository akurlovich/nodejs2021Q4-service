import Logger from './log';

const handleException = (ex: Error): void => {
  Logger.error(`uncaughtException "${ex.message}"`);
  // process.exit(1);
};

const handleRejectedPromise = (
  reason: Error,
  promise: Promise<Error>
): void => {
  Logger.error(
    `unhandledRejection, reason: ${reason} ${promise}`
  );
  // Logger.error(`unhandledRejection, reason: ${reason}, `, { promise });

  // process.exit(1);
};

export const registerExceptionHandler = (): void => {
  process.on('uncaughtException', handleException);
  process.on('unhandledRejection', handleRejectedPromise);
};
