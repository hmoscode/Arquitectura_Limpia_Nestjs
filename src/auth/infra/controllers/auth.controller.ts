import { Body, Controller, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthLoginDto, AuthResponseDto } from '../dto/auth.dto';
import { LoginUseCase } from 'src/auth/application/use-cases/login.use-case';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly loginUseCase: LoginUseCase) {}
  @Post('login')
  @ApiOkResponse({
    description: 'Login successful',
    type: AuthResponseDto,
  })
  @ApiOperation({
    summary: 'Login user',
    description: 'Logs in a user and returns a JWT token',
  })
  async login(@Body() loginDto: AuthLoginDto): Promise<AuthResponseDto> {
    const token = await this.loginUseCase.execute(
      loginDto.name,
      loginDto.password,
    );
    return { token };
  }
}
