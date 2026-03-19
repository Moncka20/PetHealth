import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Taxonomy } from '../entities/taxonomy/taxonomy.entity';
import { TaxonomyService } from '../services/taxonomy.service';
import { TaxonomyController } from '../controllers/taxonomy.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Taxonomy])],
  controllers: [TaxonomyController],
  providers: [TaxonomyService],
})
export class TaxonomyModule {}