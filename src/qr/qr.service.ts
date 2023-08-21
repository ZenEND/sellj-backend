import {
  Inject,
  Injectable,
  NotFoundException,
  StreamableFile,
} from '@nestjs/common';
import * as qrcode from 'qrcode';
import { join } from 'path';
import { GenerateQrDto } from './dto/generate-qr.dto';
import * as fs from 'fs';
import { createReadStream } from 'fs';
import { QrEntity } from './qr.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class QrService {
  @Inject(ConfigService)
  private configService: ConfigService;

  constructor(
    @InjectRepository(QrEntity)
    private qrRepository: Repository<QrEntity>,
  ) {}

  getQr(path: string) {
    const file = createReadStream(
      join(process.cwd(), `/src/qr/qr-codes/${path}.png`),
    );
    if (!file) {
      throw new NotFoundException();
    }
    return new StreamableFile(file);
  }

  async generateQr(data: GenerateQrDto) {
    if (!fs.existsSync(join(process.cwd(), '/src/qr/qr-codes'))) {
      fs.mkdir(join(process.cwd(), '/src/qr/qr-codes'), () => {
        console.log('Directory qr-codes successfully created');
      });
    }

    const qrCode = await this.qrRepository.save(data);
    await qrcode.toFile(
      join(process.cwd(), `/src/qr/qr-codes/${qrCode.id}.png`),
      `${this.configService.get('APP_URL')}/${qrCode.id}.png`,
    );

    return qrCode;
  }
}
