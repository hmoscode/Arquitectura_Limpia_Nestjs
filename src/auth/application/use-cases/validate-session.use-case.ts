import { Inject } from '@nestjs/common';
import { JwtService } from 'src/auth/domain/services/jwt.interface';
import { UserRepository } from 'src/users/domain/repositories/user.repository';

export class ValidateSessionUseCase {
  constructor(
    @Inject('UserRepository') private readonly userRepository: UserRepository,
    @Inject('JwtService') private readonly jwtService: JwtService,
  ) {}

  async execute(id: number, token: string): Promise<boolean> {
    if (!this.jwtService.validate(token)) {
      return false;
    }
    const user = await this.userRepository.findById(id);

    if (!user || !user.getIsActive()) {
      return false;
    }
    return true;
  }
}
