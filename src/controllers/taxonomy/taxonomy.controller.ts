import { Controller, Post, Body, Get } from '@nestjs/common';
import { TaxonomyService } from '../../services/taxonomy/taxonomy.service';
import { CreateTaxonomyDto } from '../../dtos/taxonomy/create-taxonomy.dto';

@Controller('taxonomy')
export class TaxonomyController {
  constructor(private readonly service: TaxonomyService) {}

  @Post()
  create(@Body() dto: CreateTaxonomyDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }
}