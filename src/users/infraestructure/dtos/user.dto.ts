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
export class GetUserDto {
  @ApiProperty({ description: 'User ID', example: 1, type: Number })
  id: number;

  @ApiProperty({
    description: 'User name',
    example: 'JhonDoe123',
    type: String,
  })
  name: string;

  @ApiProperty({
    description: 'User email',
    example: 'johndoe@example.com',
    type: String,
  })
  email: string;

  @ApiProperty({
    description: 'Date when the user was created',
    example: '2024-07-30T12:34:56.789Z',
    type: Date,
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Date when the user was last updated',
    example: '2024-07-30T12:34:56.789Z',
    type: Date,
  })
  updatedAt: Date;

  @ApiProperty({
    description: 'Indicates if the user is active',
    example: true,
    type: Boolean,
  })
  isActive: boolean;
}
