import Logger from './log';

const handleException = (ex: Error): void => {
  Logger.error(`uncaughtException "${ex.message}"`);
};

const handleRejectedPromise = (
  reason: Error,
  promise: Promise<Error>
): void => {
  Logger.error(
    `unhandledRejection, reason: ${reason} ${promise}`
  );
};

export const registerExceptionHandler = (): void => {
  process.on('uncaughtException', handleException);
  process.on('unhandledRejection', handleRejectedPromise);
};
