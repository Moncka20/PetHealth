import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Taxonomy } from '../../entities/taxonomy/taxonomy.entity';
import { Repository } from 'typeorm';
import { CreateTaxonomyDto } from '../../dtos/taxonomy/create-taxonomy.dto';

@Injectable()
export class TaxonomyService {
  constructor( @InjectRepository(Taxonomy) private repo: Repository<Taxonomy> ) {}

  async create(dto: CreateTaxonomyDto) {
    let parent = null;

    if (dto.parentId) {
      parent = await this.repo.findOneBy({ id: dto.parentId });

      if (!parent) throw new NotFoundException(`Parent con id ${dto.parentId} no existe`);
      
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
      where: { parent: null },
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
    const taxonomy = await this.findOne(id);
    return this.repo.remove(taxonomy);
  }
}