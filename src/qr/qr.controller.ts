import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { QrService } from './qr.service';
import { GenerateQrDto } from './dto/generate-qr.dto';

@ApiTags('qr')
@Controller('qr')
export class QrController {
  @Inject(QrService) qrservice: QrService;

  @Get('/:path')
  getQr(@Param('path') path: string) {
    return this.qrservice.getQr(path);
  }

  @Get()
  getQrs() {
    return this.qrservice.getQrs();
  }

  @Post()
  generateQr(@Body() body: GenerateQrDto) {
    return this.qrservice.generateQr(body);
  }
}
