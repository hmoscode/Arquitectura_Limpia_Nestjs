/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtService as IJwtService } from '../../domain/services/jwt.interface';

@Injectable()
export class JwtServiceImpl implements IJwtService {
  constructor(private readonly jwtService: JwtService) {}

  sign(payload: Record<string, any>, options?: object): string {
    const jwtOptions = {
      secret: process.env.JWT_SECRET,
      expiresIn: '1h',
      ...options,
    };
    return this.jwtService.sign(payload, jwtOptions);
  }

  validate(token: string): boolean {
    try {
      this.jwtService.verify(token, { secret: process.env.JWT_SECRET });

      return true;
    } catch (_error) {
      return false;
    }
  }
}
