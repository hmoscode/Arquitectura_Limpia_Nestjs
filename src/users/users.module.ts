import { Module } from '@nestjs/common';
import { UserController } from './infraestructure/controllers/user.controller';
import { UserTypeOrmRepository } from './infraestructure/repositories/user.repository';
import { CreateUserUseCase } from './application/use-cases/create-user.use-case';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTypeOrmEntity } from './infraestructure/typeorm/user.typeorm.entity';
import { BcryptPasswordHasher } from 'src/core/infra/security/brcypt-password-hasher';
import { UserMapper } from './infraestructure/mappers/user.mapper';
import { GetUserByIdUseCase } from './application/use-cases/get-user-by-id.use-case';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserTypeOrmEntity]), AuthModule],
  controllers: [UserController],
  providers: [
    UserTypeOrmRepository,
    {
      provide: 'UserRepository',
      useClass: UserTypeOrmRepository,
    },
    {
      provide: 'PasswordHasher',
      useClass: BcryptPasswordHasher,
    },
    CreateUserUseCase,
    UserMapper,
    GetUserByIdUseCase,
  ],

  exports: [],
})
export class UsersModule {}
