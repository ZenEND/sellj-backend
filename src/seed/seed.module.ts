import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { UsersModule } from '../users/users.module';
import { GoodsModule } from '../goods/goods.module';

@Module({
  imports: [UsersModule, GoodsModule],
  controllers: [SeedController],
  providers: [SeedService],
})
export class SeedModule {}
