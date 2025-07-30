import { User } from 'src/users/domain/entities/user.entity';
import { CreateUserDto } from '../dtos/user.dto';

export class UserMapper {
  static fromCreateUserDto(createUserDto: CreateUserDto): User {
    return new User({
      name: createUserDto.name,
      email: createUserDto.email,
      password: createUserDto.password,
      isActive: createUserDto.isActive ?? true,
    });
  }
}
