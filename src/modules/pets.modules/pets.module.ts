// src/modules/pets.modules/pets.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// 🔹 Controller
import { PetsController } from '../../controllers/pet.controller/pets.controller';

// 🔹 Service
import { PetsService } from '../../services/pet.services/pets.service';

// 🔹 Entidades
import { Pet } from '../../entities/pet.entity/pet.entity';
import { Client } from '../../entities/client/client.entity';
import { Taxonomy } from '../../entities/taxonomy/taxonomy.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pet, Client, Taxonomy])
  ],
  controllers: [PetsController],
  providers: [PetsService],
  exports: [PetsService], // opcional pero buena práctica
})
export class PetsModule {}