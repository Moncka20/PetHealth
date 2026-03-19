import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { FacturacionModule } from './modules/facturacion/facturacion.module';
import { DatabaseModule } from './database/database.module';
import { TratamientoModule } from './modules/tratamiento/tratamiento.module';
import { DetalleFacturacionModule } from './modules/detalle_facturacion/detalle_facturacion.module';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    FacturacionModule,
    TratamientoModule,
    DetalleFacturacionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
