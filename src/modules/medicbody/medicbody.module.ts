import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { medicbodyservice } from '../../services/medicbody/medicbody.service';
import { medicbodycontroller } from '../../controllers/medicbody/medicbody.controller';

import { veterinarian } from '../../entities/medicbody/veterinarian.entity';
import { specialty } from '../../entities/medicbody/specialty.entity';


@Module({
  imports: [TypeOrmModule.forFeature([veterinarian, specialty])],
  controllers: [medicbodycontroller],
  providers: [medicbodyservice],
  
})
export class medicbodymodule {}