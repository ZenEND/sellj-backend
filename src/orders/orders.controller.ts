import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  @Inject(OrdersService)
  private readonly ordersService: OrdersService;

  @Get()
  getOrders() {
    return this.ordersService.getOrders();
  }

  @Post()
  createOrder(@Body() order: CreateOrderDto) {
    return this.ordersService.createOrder(order);
  }

  @Put('/:id')
  updateOrder(@Param('id') id: string, @Body() order: UpdateOrderDto) {
    return this.ordersService.updateOrder(id, order);
  }
}
