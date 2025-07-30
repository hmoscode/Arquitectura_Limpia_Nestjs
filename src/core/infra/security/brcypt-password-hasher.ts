/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import * as bcrypt from 'bcrypt';
import { PasswordHasher } from '../../domain/services/password-hasher.interface';

export class BcryptPasswordHasher implements PasswordHasher {
  async hash(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }
  async compare(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}
