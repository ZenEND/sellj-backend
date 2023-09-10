import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateGoodDto {
  @ApiProperty({ example: 'Some Title' })
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'Some description' })
  description: string;

  @IsNumber()
  @ApiProperty({ example: 124 })
  price: number;
}
