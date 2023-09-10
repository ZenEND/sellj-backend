import { IsEnum, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { StatusEnum } from '../interfaces/status.enum';

export class CreateOrderDto {
  @IsString()
  @ApiProperty({ example: 'Example title' })
  title: string;

  @IsNumber()
  @ApiProperty({ example: 1 })
  count: number;

  @IsEnum(StatusEnum)
  @ApiProperty({ example: StatusEnum.PENDING })
  status: StatusEnum;
}
