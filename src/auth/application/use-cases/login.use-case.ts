import { Inject } from '@nestjs/common';
import { InvalidCredentialsError } from 'src/auth/domain/errors/auth.errors';
import { JwtService } from 'src/auth/domain/services/jwt.interface';
import { PasswordHasher } from 'src/core/domain/services/password-hasher.interface';
import { UserRepository } from 'src/users/domain/repositories/user.repository';

export class LoginUseCase {
  constructor(
    @Inject('UserRepository') private readonly userRepository: UserRepository,
    @Inject('JwtService') private readonly jwtService: JwtService,
    @Inject('PasswordHasher') private readonly passwordHasher: PasswordHasher,
  ) {}

  async execute(name: string, password: string): Promise<string> {
    const user = await this.userRepository.findByNameOrEmail(name);

    if (!user) {
      throw new InvalidCredentialsError('Invalid credentials');
    }
    if (!user.getIsActive()) {
      throw new InvalidCredentialsError('Invalid credentials');
    }

    const isPasswordValid = await this.passwordHasher.compare(
      password,
      user.getPassword(),
    );

    if (!isPasswordValid) {
      throw new InvalidCredentialsError('Invalid credentials');
    }

    const payload = {
      id: user.getId(),
      name: user.getName(),
      email: user.getEmail(),
      isActive: user.getIsActive(),
    };

    return this.jwtService.sign(payload);
  }
}
