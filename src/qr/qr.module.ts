import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QrController } from './qr.controller';
import { QrService } from './qr.service';
import { QrEntity } from './qr.entity';

@Module({
  imports: [TypeOrmModule.forFeature([QrEntity])],
  controllers: [QrController],
  providers: [QrService],
  exports: [QrService],
})
export class QrModule {}
