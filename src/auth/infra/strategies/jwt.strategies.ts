import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ValidateSessionUseCase } from 'src/auth/application/use-cases/validate-session.use-case';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly validateSessionUseCase: ValidateSessionUseCase) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
      passReqToCallback: true,
    });
  }

  async validate(req, payload: { token: string; id: number }): Promise<void> {
    const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);

    const isValid = await this.validateSessionUseCase.execute(
      payload.id,
      token,
    );

    if (!isValid) {
      throw new UnauthorizedException('Invalid session');
    }
  }
}
