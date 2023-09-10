import { CreateOrderDto } from './create-order.dto';
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateOrderDto extends CreateOrderDto {
  @IsString()
  @ApiProperty()
  id: string;
}
