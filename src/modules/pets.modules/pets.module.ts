// src/modules/pets.modules/pets.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// 🔹 Controller
import { PetsController } from '../../controllers/pet.controller/pets.controller';

// 🔹 Service
import { PetsService } from '../../services/pet.services/pets.service';

// 🔹 Entidades
import { Pet } from '../../entities/pets/pet.entity';
import { Owner } from '../../entities/owner.entity';
import { Breed } from '../../entities/breed.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pet, Owner, Breed])
  ],
  controllers: [PetsController],
  providers: [PetsService],
  exports: [PetsService], // opcional pero buena práctica
})
export class PetsModule {}