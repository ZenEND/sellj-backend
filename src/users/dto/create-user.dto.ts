import { IsArray, IsEnum, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { RolesEnum } from '../interfaces/roles.enum';

export class CreateUserDto {
  @IsString()
  @ApiProperty({ example: 'email@email.com' })
  public readonly email: string;

  @IsString()
  @MinLength(8)
  @ApiProperty({ example: '12345678' })
  public readonly password?: string;

  @IsArray()
  @IsEnum(RolesEnum, { each: true })
  public readonly roles?: RolesEnum[];
}
