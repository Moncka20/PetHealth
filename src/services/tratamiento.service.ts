import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTratamientoDto } from '../dtos/tratamiento/create-tratamiento.dto';
import { UpdateTratamientoDto } from '../dtos/tratamiento/update-tratamiento.dto';
import { TipoTratamiento, TratamientoEntity } from '../entities/tratamiento/tratamiento.entity';

@Injectable()
export class TratamientoService implements OnModuleInit {
  constructor(
    @InjectRepository(TratamientoEntity)
    private tratamientoRepository: Repository<TratamientoEntity>,
  ) {}

  async onModuleInit(): Promise<void> {
    const total = await this.tratamientoRepository.count();

    if (total > 0) {
      return;
    }

    const catalogoBase = [
      {
        nombre: 'Vacuna Triple Felina',
        tipo: TipoTratamiento.VACUNA,
        precio: 45,
      },
      {
        nombre: 'Examen Hemograma Completo',
        tipo: TipoTratamiento.EXAMEN,
        precio: 35,
      },
      {
        nombre: 'Limpieza Dental Basica',
        tipo: TipoTratamiento.LIMPIEZA,
        precio: 70,
      },
    ];

    await this.tratamientoRepository.save(catalogoBase);
  }

  async create(createTratamientoDto: CreateTratamientoDto): Promise<TratamientoEntity> {
    const tratamiento = this.tratamientoRepository.create(createTratamientoDto);
    return await this.tratamientoRepository.save(tratamiento);
  }

  async findAll(): Promise<TratamientoEntity[]> {
    return await this.tratamientoRepository.find();
  }

  async findOne(id: number): Promise<TratamientoEntity | null> {
    return await this.tratamientoRepository.findOne({ where: { id } });
  }

  async update(
    id: number,
    updateTratamientoDto: UpdateTratamientoDto,
  ): Promise<TratamientoEntity | null> {
    await this.tratamientoRepository.update(id, updateTratamientoDto);
    return await this.tratamientoRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<TratamientoEntity> {
    const tratamiento = await this.tratamientoRepository.findOne({ where: { id } });

    if (!tratamiento) {
      throw new NotFoundException(`No existe un tratamiento con id ${id}`);
    }

    await this.tratamientoRepository.delete(id);
    return tratamiento;
  }
}
