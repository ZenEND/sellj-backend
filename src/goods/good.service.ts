import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GoodsEntity } from './goods.entity';
import { Repository } from 'typeorm';
import { CreateGoodDto } from './dto/create-good.dto';

@Injectable()
export class GoodService {
  @InjectRepository(GoodsEntity)
  private readonly goodsRepository: Repository<GoodsEntity>;
  getGoods() {
    return this.goodsRepository.find();
  }

  createGood(good: CreateGoodDto) {
    return this.goodsRepository.save(good);
  }
}
