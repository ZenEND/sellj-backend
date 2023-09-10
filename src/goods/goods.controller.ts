import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GoodService } from './good.service';
import { CreateGoodDto } from './dto/create-good.dto';

@ApiTags('goods')
@Controller('goods')
export class GoodsController {
  @Inject()
  private readonly goodsService: GoodService;
  @Get()
  getGoods() {
    return this.goodsService.getGoods();
  }

  @Post()
  createGood(@Body() good: CreateGoodDto) {
    return this.goodsService.createGood(good);
  }
}
