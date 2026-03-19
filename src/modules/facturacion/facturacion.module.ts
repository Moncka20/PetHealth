import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FacturacionService } from '../../services/facturacion/facturacion.service';
import { FacturacionController } from '../../controllers/facturacion/facturacion.controller';
import { facturacionEntity } from '../../entities/facturacion/facturacion.entity';
import { specialty } from '../../entities/medicbody/specialty.entity';
import { DetalleFacturacionEntity } from '../../entities/detalle_facturacion/detalle_facturacion.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      facturacionEntity,
      specialty,
      DetalleFacturacionEntity,
    ]),
  ],
  controllers: [FacturacionController],
  providers: [FacturacionService],
})
export class FacturacionModule {}
