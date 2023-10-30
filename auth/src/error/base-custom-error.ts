export abstract class BaseCustomError extends Error {
  protected abstract statusCode: number;

  constructor(message?: string) {
    super(message);
    Object.setPrototypeOf(this, BaseCustomError.prototype);
  }

  abstract getStatusCode(): number;

  abstract serializeErrorOutput(): unknown;
}
