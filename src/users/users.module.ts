import { Module } from '@nestjs/common';
import { UserController } from './infraestructure/controllers/user.controller';
import { UserTypeOrmRepository } from './infraestructure/repositories/user.repository';
import { CreateUserUseCase } from './application/use-cases/create-user.use-case';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTypeOrmEntity } from './infraestructure/typeorm/user.typeorm.entity';
import { GenericMapper } from 'src/core/infra/mappers/generic.mapper';
import { BcryptPasswordHasher } from 'src/core/infra/security/brcypt-password-hasher';
import { PasswordHasher } from 'src/core/domain/services/password-hasher.interface';
@Module({
  imports: [TypeOrmModule.forFeature([UserTypeOrmEntity])],
  controllers: [UserController],
  providers: [
    UserTypeOrmRepository,
    {
      provide: 'UserRepository',
      useClass: UserTypeOrmRepository,
    },
    {
      provide: GenericMapper,
      useClass: GenericMapper,
    },
    {
      provide: 'PasswordHasher',
      useClass: BcryptPasswordHasher,
    },
    CreateUserUseCase,
  ],

  exports: [],
})
export class UsersModule {}
