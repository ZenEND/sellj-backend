import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/roles.guard';
import { QrModule } from './qr/qr.module';
import { SeedModule } from './seed/seed.module';
import { OrdersModule } from './orders/orders.module';
import { GoodsModule } from './goods/goods.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    SeedModule,
    AuthModule,
    UsersModule,
    QrModule,
    OrdersModule,
    GoodsModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
