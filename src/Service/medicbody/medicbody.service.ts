import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { veterinarian } from '../../entities/medicbody/veterinarian.entity';
import { specialty } from '../../entities/medicbody/specialty.entity';

@Injectable()
export class medicbodyservice {
  constructor(
    @InjectRepository(veterinarian)
    private veterinarianrepo: Repository<veterinarian>,
    @InjectRepository(specialty)
    private specialtyrepo: Repository<specialty>,
  ) {}

  async create_specialty(data: any) {
    const new_specialty = this.specialtyrepo.create({
      name: data.name,
      base_cost: data.base_cost
    });
    return this.specialtyrepo.save(new_specialty);
  }

  async get_specialties() {
    return this.specialtyrepo.find();
  }

  async update_specialty(id: number, data: any) {
    const specialty = await this.specialtyrepo.findOne({ where: { id } });
    if (!specialty) throw new NotFoundException('specialty not found');
    Object.assign(specialty, data);
    return this.specialtyrepo.save(specialty);
  }

  async get_veterinarians() {
    return this.veterinarianrepo.find();
  }

  async create_veterinarian(data: any) {
    const specialty = await this.specialtyrepo.findOne({
      where: { id: data.specialty_id }
    });
    if (!specialty) throw new NotFoundException('specialty not found');
    const new_vet = this.veterinarianrepo.create({
      name: data.name,
      phone: data.phone,
      specialty: specialty
    });
    return this.veterinarianrepo.save(new_vet);
  }

  async update_veterinarian(id: number, data: any) {
    const vet = await this.veterinarianrepo.findOne({ where: { id } });
    if (!vet) throw new NotFoundException('veterinarian not found');

    if (data.specialty_id) {
      const specialty = await this.specialtyrepo.findOne({
        where: { id: data.specialty_id }
      });
      if (!specialty) throw new NotFoundException('specialty not found');
      vet.specialty = specialty;
    }

    Object.assign(vet, { name: data.name, phone: data.phone });
    return this.veterinarianrepo.save(vet);
  }

  async delete_specialty(id: number) {
  const specialty = await this.specialtyrepo.findOne({ where: { id } });
  if (!specialty) throw new NotFoundException('specialty not found');
  return this.specialtyrepo.remove(specialty);
}

async delete_veterinarian(id: number) {
  const vet = await this.veterinarianrepo.findOne({ where: { id } });
  if (!vet) throw new NotFoundException('veterinarian not found');
  return this.veterinarianrepo.remove(vet);
}

}
