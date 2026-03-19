import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFacturacionDto } from '../../dtos/facturacion/create-facturacion.dto';
import { UpdateFacturacionDto } from '../../dtos/facturacion/update-facturacion.dto';
import { facturacionEntity } from '../../entities/facturacion/facturacion.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { specialty } from '../../entities/medicbody/specialty.entity';
import { DetalleFacturacionEntity } from '../../entities/detalle_facturacion/detalle_facturacion.entity';

@Injectable()
export class FacturacionService {
  constructor(
    @InjectRepository(facturacionEntity)
    private facturacionRepository: Repository<facturacionEntity>,
    @InjectRepository(specialty)
    private especialityRepository: Repository<specialty>,
    @InjectRepository(DetalleFacturacionEntity)
    private detalleFacturacionRepository: Repository<DetalleFacturacionEntity>,
  ) {}

  async create(createFacturacionDto: CreateFacturacionDto): Promise<facturacionEntity> {
    const factura = this.facturacionRepository.create(createFacturacionDto);
    return await this.facturacionRepository.save(factura);
  }

  async findAll(): Promise<facturacionEntity[]> {
    return await this.facturacionRepository.find();
  }

  async findOne(id: number): Promise<facturacionEntity | null> {
    return await this.facturacionRepository.findOne({ where: { id } });
  }

  async update(
    id: number,
    updateFacturacionDto: UpdateFacturacionDto,
  ): Promise<facturacionEntity | null> {
    await this.facturacionRepository.update(id, updateFacturacionDto);
    return await this.facturacionRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<facturacionEntity> {
    const factura = await this.facturacionRepository.findOne({ where: { id } });

    if (!factura) {
      throw new NotFoundException(`No existe una factura con id ${id}`);
    }

    await this.facturacionRepository.delete(id);
    return factura;
  }

  async calcularCostoTotalCita(idConsulta: number, idEspecialidad: number) {
    const especialidad = await this.especialityRepository.findOne({
      where: { id: idEspecialidad },
    });

    if (!especialidad) {
      throw new NotFoundException(`No existe una especialidad con id ${idEspecialidad}`);
    }

    const detalles = await this.detalleFacturacionRepository.find({
      where: { idConsulta },
    });

    const costoBaseEspecialidad = Number(especialidad.base_cost);
    const totalTratamientos = detalles.reduce(
      (acumulado, detalle) => acumulado + Number(detalle.subtotal),
      0,
    );

    return {
      idConsulta,
      idEspecialidad,
      costoBaseEspecialidad,
      totalTratamientos,
      costoTotalCita: costoBaseEspecialidad + totalTratamientos,
    };
  }
}
