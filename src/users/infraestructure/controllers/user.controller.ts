import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserUseCase } from 'src/users/application/use-cases/create-user.use-case';
import { CreateUserDto } from '../dtos/user.dto';
import { UserMapper } from '../mappers/user.mapper';
import { GenericResponseDto } from 'src/core/infra/dto/generic-response-dto.dto';

@Controller('users')
@ApiTags('users')
export class UserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @Post('/')
  async createUser(@Body() user: CreateUserDto): Promise<GenericResponseDto> {
    const userEntity = UserMapper.fromCreateUserDto(user);
    return new GenericResponseDto({
      id: await this.createUserUseCase.execute(userEntity),
      message: 'User created successfully',
      statusCode: 201,
    });
  }
}
