import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AgendamientoModule } from './modules/agendamiento.module';
import { FacturacionModule } from './modules/facturacion/facturacion.module';
import { DatabaseModule } from './database/database.module';
import { TratamientoModule } from './modules/tratamiento/tratamiento.module';
import { DetalleFacturacionModule } from './modules/detalle_facturacion/detalle_facturacion.module';
import { PetsModule } from './modules/pets.modules/pets.module';
import { medicbodymodule } from "./modules/medicbody/medicbody.module";
import { ClientModule } from './modules/client/client.module';
import { TaxonomyModule } from './modules/taxonomy/taxonomy.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DatabaseModule,
    AgendamientoModule,
    FacturacionModule,
    TratamientoModule,
    DetalleFacturacionModule,
    PetsModule,
    medicbodymodule,
    ClientModule,
    TaxonomyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}