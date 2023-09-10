import { Inject, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RolesEnum } from '../users/interfaces/roles.enum';
import { GoodsService } from '../goods/goods.service';

@Injectable()
export class SeedService {
  @Inject(UsersService)
  private usersService: UsersService;

  @Inject(GoodsService)
  private goodsService: GoodsService;

  seedUsers() {
    return this.usersService.createUser({
      password: '1234',
      email: 'admin@email.com',
      roles: [RolesEnum.Admin],
    });
  }

  seedGoods() {
    return this.goodsService.createGood({
      title: `Some Title`,
      price: 1,
      description: `Some Description`,
    });
  }
}
