import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Pet } from '../../entities/pet.entity/pet.entity';
import { Owner } from '../../entities/owner.entity';
import { Breed } from '../../entities/breed.entity';

import { CreatePetDto } from '../../dtos/pets/create-pet.dto/create-pet.dto';
import { UpdatePetDto } from '../../dtos/pets/update-pet.dto/update-pet.dto';

@Injectable()
export class PetsService {

  constructor(
    @InjectRepository(Pet)
    private readonly petRepository: Repository<Pet>,

    @InjectRepository(Owner)
    private readonly ownerRepository: Repository<Owner>,

    @InjectRepository(Breed)
    private readonly breedRepository: Repository<Breed>,
  ) {}

  // 🔥 CREATE
  async create(createPetDto: CreatePetDto) {

    const { owner_id, breed_id, ...data } = createPetDto;

    const owner = await this.ownerRepository.findOneBy({ id: owner_id });
    if (!owner) {
      throw new NotFoundException('owner not found');
    }

    const breed = await this.breedRepository.findOneBy({ id: breed_id });
    if (!breed) {
      throw new NotFoundException('breed not found');
    }

    const pet = this.petRepository.create({
      ...data,
      owner,
      breed,
    });

    return this.petRepository.save(pet);
  }

  // 🔍 FIND ALL
  async findAll() {

    const pets = await this.petRepository.find({
      relations: ['owner', 'breed'],
    });

    return pets.map(pet => ({
      ...pet,
      age: this.calculateAge(pet.birth_date),
    }));
  }

  // 🔍 FIND ONE
  async findOne(id: number) {

    const pet = await this.petRepository.findOne({
      where: { id },
      relations: ['owner', 'breed'],
    });

    if (!pet) {
      throw new NotFoundException('pet not found');
    }

    return {
      ...pet,
      age: this.calculateAge(pet.birth_date),
    };
  }

  // 🔄 UPDATE
  async update(id: number, updatePetDto: UpdatePetDto) {

    const pet = await this.petRepository.findOneBy({ id });

    if (!pet) {
      throw new NotFoundException('pet not found');
    }

    await this.petRepository.update(id, updatePetDto);

    return this.findOne(id);
  }

  // ❌ DELETE
  async remove(id: number) {

    const pet = await this.petRepository.findOneBy({ id });

    if (!pet) {
      throw new NotFoundException('pet not found');
    }

    await this.petRepository.delete(id);

    return { message: 'pet deleted' };
  }

  // 🔥 FUNCIÓN CLAVE (edad)
  private calculateAge(birth_date: Date): number {

    const today = new Date();
    const birth = new Date(birth_date);

    let age = today.getFullYear() - birth.getFullYear();

    const month = today.getMonth() - birth.getMonth();

    if (month < 0 || (month === 0 && today.getDate() < birth.getDate())) {
      age--;
    }

    return age;
  }
}