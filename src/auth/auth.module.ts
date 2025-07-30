import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './infra/controllers/auth.controller';
import { LoginUseCase } from './application/use-cases/login.use-case';
import { JwtServiceImpl } from './infra/services/jwt.service.impl';
import { UserTypeOrmRepository } from 'src/users/infraestructure/repositories/user.repository';
import { BcryptPasswordHasher } from 'src/core/infra/security/brcypt-password-hasher';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTypeOrmEntity } from 'src/users/infraestructure/typeorm/user.typeorm.entity';
import { UserMapper } from 'src/users/infraestructure/mappers/user.mapper';
import { PassportModule } from '@nestjs/passport';
import { ValidateSessionUseCase } from './application/use-cases/validate-session.use-case';
import { JwtStrategy } from './infra/strategies/jwt.strategies';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserTypeOrmEntity]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [AuthController],
  providers: [
    LoginUseCase,
    {
      provide: 'JwtService',
      useClass: JwtServiceImpl,
    },
    {
      provide: 'UserRepository',
      useClass: UserTypeOrmRepository,
    },
    {
      provide: 'PasswordHasher',
      useClass: BcryptPasswordHasher,
    },
    UserMapper,
    ValidateSessionUseCase,
    JwtStrategy,
  ],
  exports: ['JwtService', ValidateSessionUseCase, PassportModule],
})
export class AuthModule {}
