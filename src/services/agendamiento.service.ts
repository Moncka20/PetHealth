import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Agendamiento } from '../entities/agendamiento.entity';
import { CreateAgendamientoDto } from '../dto/agendamiento/create-agendamiento.dto';
import { UpdateAgendamientoDto } from '../dto/agendamiento/update-agendamiento.dto';

@Injectable()
export class AgendamientoService {
  constructor(
    @InjectRepository(Agendamiento)
    private readonly agendamientoRepository: Repository<Agendamiento>,
  ) {}

  async create(dto: CreateAgendamientoDto): Promise<Agendamiento> {
    const conflicto = await this.agendamientoRepository.findOne({
      where: {
        veterinario: { id: dto.veterinario_id },
        fecha_hora: new Date(dto.fecha_hora),
      },
    });

    if (conflicto) {
      throw new BadRequestException(
        `El veterinario ya tiene una cita programada para ${dto.fecha_hora}`,
      );
    }

    const agendamiento = this.agendamientoRepository.create({
      fecha_hora: new Date(dto.fecha_hora),
      estado: dto.estado ?? 'programada',
      mascota: { id: dto.mascota_id } as any,
      veterinario: { id: dto.veterinario_id } as any,
    });

    return this.agendamientoRepository.save(agendamiento);
  }

  findAll(): Promise<Agendamiento[]> {
    return this.agendamientoRepository.find();
  }

  async findOne(id: number): Promise<Agendamiento> {
    const agendamiento = await this.agendamientoRepository.findOne({ where: { id } });
    if (!agendamiento) throw new NotFoundException(`Agendamiento #${id} no encontrado`);
    return agendamiento;
  }

  async update(id: number, dto: UpdateAgendamientoDto): Promise<Agendamiento> {
    const agendamiento = await this.findOne(id);

    if (dto.fecha_hora && dto.veterinario_id) {
      const conflicto = await this.agendamientoRepository.findOne({
        where: {
          veterinario: { id: dto.veterinario_id },
          fecha_hora: new Date(dto.fecha_hora),
        },
      });
      if (conflicto && conflicto.id !== id) {
        throw new BadRequestException(
          `El veterinario ya tiene una cita programada para ${dto.fecha_hora}`,
        );
      }
    }

    Object.assign(agendamiento, {
      ...(dto.fecha_hora && { fecha_hora: new Date(dto.fecha_hora) }),
      ...(dto.estado && { estado: dto.estado }),
      ...(dto.mascota_id && { mascota: { id: dto.mascota_id } }),
      ...(dto.veterinario_id && { veterinario: { id: dto.veterinario_id } }),
    });

    return this.agendamientoRepository.save(agendamiento);
  }

  async remove(id: number): Promise<void> {
    const agendamiento = await this.findOne(id);
    await this.agendamientoRepository.remove(agendamiento);
  }
}