export interface JwtService {
  sign(payload: Record<string, any>, options?: object): string;
  validate(token: string): boolean;
}
