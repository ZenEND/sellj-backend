import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GenerateQrDto {
  @IsString()
  @IsOptional()
  @ApiProperty()
  info: string;
}
