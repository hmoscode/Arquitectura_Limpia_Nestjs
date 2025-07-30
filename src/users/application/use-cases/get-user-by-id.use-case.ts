import { Inject } from '@nestjs/common';
import { User } from 'src/users/domain/entities/user.entity';
import { UserNotFoundError } from 'src/users/domain/errors/user.errors';
import { UserRepository } from 'src/users/domain/repositories/user.repository';

export class GetUserByIdUseCase {
  constructor(
    @Inject('UserRepository') private readonly userRepository: UserRepository,
  ) {}

  async execute(id: number): Promise<User> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new UserNotFoundError(`User with ID ${id} not found`);
    }
    return user;
  }
}
