import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Agendamiento } from '../entities/agendamiento.entity';
import { AgendamientoService } from '../services/agendamiento.service';
import { AgendamientoController } from '../controllers/agendamiento.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Agendamiento])],
  controllers: [AgendamientoController],
  providers: [AgendamientoService],
  exports: [AgendamientoService],
})
export class AgendamientoModule {}