import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { medicbodymodule } from "./modules/medicbody/medicbody.module";
import { DatabaseModule } from './database/database.module'; // importa el módulo

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DatabaseModule,        // ← esto faltaba
    medicbodymodule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}