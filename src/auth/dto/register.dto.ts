import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @IsString()
  @ApiProperty({ example: 'email@email.com' })
  public readonly email: string;

  @IsString()
  @MinLength(8)
  @ApiProperty({ example: '12345678' })
  public readonly password?: string;
}
