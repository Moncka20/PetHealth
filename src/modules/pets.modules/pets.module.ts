import { Module } from '@nestjs/common';
import { PetsService } from '../../services/pet.services/pets.service';
import { PetsController } from '../../controllers/pet.controller/pets.controller';

@Module({
  providers: [PetsService],
  controllers: [PetsController]
})
export class PetsModule {}
