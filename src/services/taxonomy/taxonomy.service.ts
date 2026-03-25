import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Taxonomy } from '../../entities/taxonomy/taxonomy.entity';
import { Repository } from 'typeorm';
import { CreateTaxonomyDto } from '../../dtos/taxonomy/create-taxonomy.dto';
import { IsNull } from 'typeorm';

@Injectable()
export class TaxonomyService {
  constructor( @InjectRepository(Taxonomy) private repo: Repository<Taxonomy> ) {}

async create(dto: CreateTaxonomyDto) {
  let parent: Taxonomy | undefined = undefined;

  if (dto.parentId) {
    const foundParent = await this.repo.findOneBy({ id: dto.parentId });

    if (!foundParent) {
      throw new NotFoundException(`Parent con id ${dto.parentId} no existe`);
    }

    parent = foundParent;
  }

  const taxonomy = this.repo.create({
    name: dto.name,
    description: dto.description,
    parent,
  });

  return this.repo.save(taxonomy);
}

findAll() {
  return this.repo.find({
    where: { parent: IsNull() },
    relations: ['children'],
    order: { id: 'ASC' },
  });
}

  async findOne(id: number) {
    const taxonomy = await this.repo.findOne({
      where: { id },
      relations: ['parent', 'children'],
    });

    if (!taxonomy) throw new NotFoundException(`Taxonomy con id ${id} no existe`);

    return taxonomy;
  }

async remove(id: number) {
  const taxonomy = await this.repo.findOne({
    where: { id },
    relations: ['children'],
  });

  if (!taxonomy) {
    throw new NotFoundException(`Taxonomy con id ${id} no existe`);
  }

  if (taxonomy.children.length > 0) {
    throw new Error('No puedes eliminar una taxonomía con hijos');
  }

  return this.repo.remove(taxonomy);
}

  async update(id: number, dto: CreateTaxonomyDto) {
  let parent: Taxonomy | undefined = undefined;

  if (dto.parentId) {
    // 🚨 evitar que se apunte a sí mismo
    if (dto.parentId === id) {
      throw new Error('Una taxonomía no puede ser su propio padre');
    }

    parent = (await this.repo.findOneBy({ id: dto.parentId })) ?? undefined;

    if (!parent) throw new NotFoundException(`Parent con id ${dto.parentId} no existe`);
  }

  const taxonomy = await this.repo.preload({
    id,
    name: dto.name,
    description: dto.description,
    parent,
  });

  if (!taxonomy) {
    throw new NotFoundException(`Taxonomy con id ${id} no existe`);
  }

  return this.repo.save(taxonomy);
  }
}