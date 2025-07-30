import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, Matches, IsBoolean } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'user name for the new user',
    example: 'JhonDoe123',
    type: String,
    required: true,
  })
  @IsString()
  @Matches(/^[A-Za-z0-9]+$/, {
    message: 'Username must not contain spaces or special characters',
  })
  name: string;

  @ApiProperty({
    description: 'user email for the new user',
    example: 'johndoe@example.com',
    type: String,
    required: true,
  })
  @IsString()
  email: string;

  @ApiProperty({
    description: 'user password for the new user',
    example: 'StrongPassword123!',
    type: String,
    required: true,
  })
  @IsString()
  @MinLength(8, {
    message: 'Password must be at least 8 characters long',
  })
  password: string;
  @ApiProperty({
    type: Boolean,
    description: 'Indicates if the user is active',
    example: true,
    required: false,
  })
  @IsBoolean()
  isActive?: boolean;
}
