import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FacturacionService } from '../../services/facturacion/facturacion.service';
import { FacturacionController } from '../../controllers/facturacion/facturacion.controller';
import { facturacionEntity } from '../../entities/facturacion/facturacion.entity';
import { EspecialityEntity } from '../../entities/especiality/especiality.entity';
import { DetalleFacturacionEntity } from '../../entities/detalle_facturacion/detalle_facturacion.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      facturacionEntity,
      EspecialityEntity,
      DetalleFacturacionEntity,
    ]),
  ],
  controllers: [FacturacionController],
  providers: [FacturacionService],
})
export class FacturacionModule {}
