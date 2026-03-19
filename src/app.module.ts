import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { FacturacionModule } from './modules/facturacion.module';

@Module({
  imports: [    
    TypeOrmModule.forFeature([]),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',}),
    FacturacionModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
