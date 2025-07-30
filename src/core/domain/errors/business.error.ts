export class BusinessError extends Error {
  constructor(
    public code: string,
    message?: string,
  ) {
    super(message);
    this.name = 'BusinessError';
  }
}
