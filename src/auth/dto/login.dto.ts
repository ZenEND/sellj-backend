import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @IsEmail()
  @ApiProperty({ example: 'email@email.com' })
  public readonly email: string;

  @IsString()
  @ApiProperty({ example: '12345678' })
  public readonly password: string;
}
