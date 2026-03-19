import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe, ValidationPipe,
} from '@nestjs/common';

import { PetsService } from '../services/pets.services/pets.service';

import { CreatePetDto } from '../dto/pets/create-pet.dto';
import { UpdatePetDto } from '../dto/pets/update-pet.dto';

@Controller('pets')
export class PetsController {

  constructor(private readonly petsService: PetsService) {}

  // 🔥 CREATE
  @Post()
  create(
    @Body(new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }))
    createPetDto: CreatePetDto,
  ) {
    return this.petsService.create(createPetDto);
  }

  // 🔍 FIND ALL
  @Get()
  findAll() {
    return this.petsService.findAll();
  }

  // 🔍 FIND ONE
  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.petsService.findOne(id);
  }

  // 🔄 UPDATE
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }))
    updatePetDto: UpdatePetDto,
  ) {
    return this.petsService.update(id, updatePetDto);
  }

  // ❌ DELETE
  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.petsService.remove(id);
  }
}