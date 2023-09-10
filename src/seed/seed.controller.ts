import { Controller, Get, Inject } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SeedService } from './seed.service';

@ApiTags('seed')
@Controller('seed')
export class SeedController {
  @Inject(SeedService)
  private seedService: SeedService;
  @Get('users')
  seedUsers() {
    return this.seedService.seedUsers();
  }

  @Get('goods')
  seedGoods() {
    return this.seedService.seedGoods();
  }
}
