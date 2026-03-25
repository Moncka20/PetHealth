import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetalleFacturacionController } from '../../controllers/detalle_facturacion/detalle_facturacion.controller';
import { DetalleFacturacionEntity } from '../../entities/detalle_facturacion/detalle_facturacion.entity';
import { facturacionEntity } from '../../entities/facturacion/facturacion.entity';
import { TratamientoEntity } from '../../entities/tratamiento/tratamiento.entity';
import { DetalleFacturacionService } from '../../services/detalle_facturacion/detalle_facturacion.service';

import { Agendamiento } from '../../entities/agendamiento/agendamiento.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      DetalleFacturacionEntity,
      facturacionEntity,
      TratamientoEntity,
      Agendamiento,
    ]),
  ],
  controllers: [DetalleFacturacionController],
  providers: [DetalleFacturacionService],
})
export class DetalleFacturacionModule {}
