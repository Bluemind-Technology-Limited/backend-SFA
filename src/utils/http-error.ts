// this is a custom HTTP error class used across the app
export class HttpError extends Error {
  // this is the HTTP status code
  public statusCode: number;
  // this is an optional error code string
  public code?: string;

  constructor(statusCode: number, message: string, code?: string) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.name = 'HttpError';
  }
}
