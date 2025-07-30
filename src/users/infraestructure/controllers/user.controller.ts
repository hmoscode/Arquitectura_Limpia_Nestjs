import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserUseCase } from 'src/users/application/use-cases/create-user.use-case';
import { CreateUserDto, GetUserDto } from '../dtos/user.dto';

import { GenericResponseDto } from 'src/core/infra/dto/generic-response-dto.dto';
import { UserMapper } from '../mappers/user.mapper';
import { GetUserByIdUseCase } from 'src/users/application/use-cases/get-user-by-id.use-case';
import { JwtStrategy } from 'src/auth/infra/strategies/jwt.strategies';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
@ApiTags('Users')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
    private readonly userMapper: UserMapper,
  ) {}

  @Post('/')
  @ApiOkResponse({
    description: 'User created successfully',
    type: GenericResponseDto,
  })
  @ApiOperation({
    summary: 'Create a new user',
    description: 'This endpoint allows you to create a new user in the system.',
  })
  async createUser(@Body() user: CreateUserDto): Promise<GenericResponseDto> {
    const userEntity = this.userMapper.fromCreateUserDto(user);
    return new GenericResponseDto({
      id: await this.createUserUseCase.execute(userEntity),
      message: 'User created successfully',
      statusCode: 201,
    });
  }

  @Get('/:id')
  @ApiOperation({
    summary: ' Get user by ID',
    description: 'This endpoint retrieves a user by their ID.',
  })
  @ApiOkResponse({
    type: GetUserDto,
    description: 'User retrieved successfully',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async getUserById(@Param('id') id: number) {
    const user = await this.getUserByIdUseCase.execute(id);
    return this.userMapper.toGetUserDto(user);
  }
}
