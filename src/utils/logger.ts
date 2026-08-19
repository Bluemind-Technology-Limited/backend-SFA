// this is a minimal logger for consistent console output
export const logger = {
  // this logs an info message
  info(message: string, meta?: unknown) {
    console.log(`[INFO] ${message}`, meta ?? '');
  },
  // this logs an error message
  error(message: string, meta?: unknown) {
    console.error(`[ERROR] ${message}`, meta ?? '');
  },
  // this logs a warning message
  warn(message: string, meta?: unknown) {
    console.warn(`[WARN] ${message}`, meta ?? '');
  },
};
