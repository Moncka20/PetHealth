import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Taxonomy } from '../entities/taxonomy/taxonomy.entity';
import { Repository } from 'typeorm';
import { CreateTaxonomyDto } from '../dtos/taxonomy/create-taxonomy.dto';

@Injectable()
export class TaxonomyService {
  constructor( @InjectRepository(Taxonomy) private repo: Repository<Taxonomy> ) {}

  async create(dto: CreateTaxonomyDto) {

    let parent = null;

    if (dto.parentId) parent = await this.repo.findOneBy({ id: dto.parentId });
    

    const taxonomy = this.repo.create({
      name: dto.name,
      description: dto.description,
      parent,
    });

    return this.repo.save(taxonomy);
  }

  findAll() {
    return this.repo.find({
      relations: ['parent', 'children'],
    });
  }
}