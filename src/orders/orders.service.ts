import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrdersEntity } from './orders.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  @InjectRepository(OrdersEntity)
  private readonly ordersRepository: Repository<OrdersEntity>;

  getOrders() {
    return this.ordersRepository.find();
  }

  createOrder(order: CreateOrderDto) {
    return this.ordersRepository.save(order);
  }

  async updateOrder(id: string, order: UpdateOrderDto) {
    const savedOrder = await this.ordersRepository.findOneOrFail({
      where: { id },
    });
    return this.ordersRepository.save({ ...savedOrder, order });
  }
}
