import { User } from 'src/users/domain/entities/user.entity';
import { CreateUserDto, GetUserDto } from '../dtos/user.dto';
import { UserTypeOrmEntity } from '../typeorm/user.typeorm.entity';

export class UserMapper {
  fromCreateUserDto(createUserDto: CreateUserDto): User {
    return new User({
      ...createUserDto,
      isActive: createUserDto.isActive ?? true,
    });
  }

  toDomain(entity: UserTypeOrmEntity): User {
    return new User({
      id: entity.id,
      name: entity.name,
      email: entity.email,
      password: entity.password,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt,
      isActive: entity.isActive,
    });
  }

  toGetUserDto(user: User): GetUserDto {
    return {
      id: user.getId() as number,
      name: user.getName() as string,
      email: user.getEmail() as string,
      createdAt: user.getCreatedAt() as Date,
      updatedAt: user.getUpdatedAt() as Date,
      isActive: user.getIsActive() as boolean,
    };
  }
}
