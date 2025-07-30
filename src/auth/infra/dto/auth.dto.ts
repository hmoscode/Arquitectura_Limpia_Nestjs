/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, ValidateIf } from 'class-validator';

export class AuthLoginDto {
  @ApiProperty({
    description: 'User name or email',
    example: 'john.doe@example.com',
    required: true,
  })
  @ValidateIf((o) => typeof o.name === 'string')
  @IsString()
  @ValidateIf((o) => /\S+@\S+\.\S+/.test(o.name))
  @IsEmail({}, { message: 'If using email, it must be valid.' })
  name: string;

  @ApiProperty({
    description: 'User password',
    example: 'password123',
    required: true,
  })
  @IsString()
  password: string;
}

export class AuthResponseDto {
  @ApiProperty({
    description: 'JWT token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    required: true,
  })
  @IsString()
  token: string;
}
