import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { FacturacionModule } from './modules/facturacion/facturacion.module';
import { DatabaseModule } from './database/database.module';
import { TratamientoModule } from './modules/tratamiento/tratamiento.module';
import { DetalleFacturacionModule } from './modules/detalle_facturacion/detalle_facturacion.module';
import { PetsModule } from './modules/pets.modules/pets.module';
import { medicbodymodule } from "./modules/medicbody/medicbody.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    FacturacionModule,
    TratamientoModule,
    DetalleFacturacionModule,
    DatabaseModule,
    PetsModule,       // ← esto faltaba
    medicbodymodule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}