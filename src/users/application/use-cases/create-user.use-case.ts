import { Inject } from '@nestjs/common';
import { PasswordHasher } from 'src/core/domain/services/password-hasher.interface';
import { User } from 'src/users/domain/entities/user.entity';
import { UserAlreadyExistsError } from 'src/users/domain/errors/user.errors';
import { UserRepository } from 'src/users/domain/repositories/user.repository';

export class CreateUserUseCase {
  constructor(
    @Inject('UserRepository') private readonly userRepository: UserRepository,
    @Inject('PasswordHasher') private readonly passwordHasher: PasswordHasher,
  ) {}

  async execute(user: User): Promise<number> {
    const existingUser = await this.userRepository.existsByEmailAndName(
      user.getEmail(),
      user.getName(),
    );

    user.setPassword(await this.passwordHasher.hash(user.getPassword()));
    if (existingUser) {
      throw new UserAlreadyExistsError(
        'User with this email and name already exists',
      );
    }
    const userId = await this.userRepository.save(user);
    return userId;
  }
}
