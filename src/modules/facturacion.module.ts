import { Module } from '@nestjs/common';
import { FacturacionService } from '../services/facturacion.service';
import { FacturacionController } from './facturacion.controller';

@Module({
  controllers: [FacturacionController],
  providers: [FacturacionService],
})
export class FacturacionModule {}
