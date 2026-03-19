import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { PetsModule } from './modules/pets.modules/pets.module';
import { DatabaseModule } from './database/database.module'; 
import { medicbodymodule } from "./modules/medicbody/medicbody.module";


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DatabaseModule,
    PetsModule,       // ← esto faltaba
    medicbodymodule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}