import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDetalleFacturaDto } from '../../dtos/detalle_facturacion/create-detalle_facturacion.dto';
import { UpdateDetalleFacturaDto } from '../../dtos/detalle_facturacion/update-detalle_facturacion.dto';
import { DetalleFacturacionEntity } from '../../entities/detalle_facturacion/detalle_facturacion.entity';
import { facturacionEntity } from '../../entities/facturacion/facturacion.entity';
import { TratamientoEntity } from '../../entities/tratamiento/tratamiento.entity';
import { Agendamiento } from '../../entities/agendamiento/agendamiento.entity';

@Injectable()
export class DetalleFacturacionService {
  constructor(
    @InjectRepository(DetalleFacturacionEntity)
    private detalleFacturacionRepository: Repository<DetalleFacturacionEntity>,
    @InjectRepository(facturacionEntity)
    private facturacionRepository: Repository<facturacionEntity>,
    @InjectRepository(TratamientoEntity)
    private tratamientoRepository: Repository<TratamientoEntity>,
    @InjectRepository(Agendamiento)
    private agendamientoRepository: Repository<Agendamiento>,
  ) {}

  async create(createDetalleFacturaDto: CreateDetalleFacturaDto): Promise<DetalleFacturacionEntity> {
    const factura = await this.facturacionRepository.findOne({
      where: { id: createDetalleFacturaDto.idFactura },
    });

    if (!factura) {
      throw new NotFoundException(
        `No existe una factura con id ${createDetalleFacturaDto.idFactura}`,
      );
    }

    const tratamiento = await this.tratamientoRepository.findOne({
      where: { id: createDetalleFacturaDto.idTratamiento },
    });

    if (!tratamiento) {
      throw new NotFoundException(
        `No existe un tratamiento con id ${createDetalleFacturaDto.idTratamiento}`,
      );
    }

    const precioUnitario = Number(tratamiento.precio);
    const subtotal = Number(createDetalleFacturaDto.cantidad) * precioUnitario;

    const detalle = this.detalleFacturacionRepository.create({
      idFactura: createDetalleFacturaDto.idFactura,
      idTratamiento: createDetalleFacturaDto.idTratamiento,
      concepto: createDetalleFacturaDto.concepto,
      cantidad: createDetalleFacturaDto.cantidad,
      precioUnitario,
      subtotal,
    });

    return await this.detalleFacturacionRepository.save(detalle);
  }

  async findAll(): Promise<DetalleFacturacionEntity[]> {
    return await this.detalleFacturacionRepository.find();
  }

  async findOne(id: number): Promise<DetalleFacturacionEntity | null> {
    return await this.detalleFacturacionRepository.findOne({ where: { id } });
  }

  async update(
    id: number,
    updateDetalleFacturaDto: UpdateDetalleFacturaDto,
  ): Promise<DetalleFacturacionEntity | null> {
    const detalleActual = await this.detalleFacturacionRepository.findOne({ where: { id } });

    if (!detalleActual) {
      throw new NotFoundException(`No existe un detalle de facturacion con id ${id}`);
    }

    let precioUnitario = Number(detalleActual.precioUnitario);

    if (updateDetalleFacturaDto.idTratamiento) {
      const tratamiento = await this.tratamientoRepository.findOne({
        where: { id: updateDetalleFacturaDto.idTratamiento },
      });

      if (!tratamiento) {
        throw new NotFoundException(
          `No existe un tratamiento con id ${updateDetalleFacturaDto.idTratamiento}`,
        );
      }

      precioUnitario = Number(tratamiento.precio);
    }

    const cantidad = Number(updateDetalleFacturaDto.cantidad ?? detalleActual.cantidad);
    const subtotal = cantidad * precioUnitario;

    await this.detalleFacturacionRepository.update(id, {
      ...updateDetalleFacturaDto,
      precioUnitario,
      subtotal,
    });

    return await this.detalleFacturacionRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<DetalleFacturacionEntity> {
    const detalle = await this.detalleFacturacionRepository.findOne({ where: { id } });

    if (!detalle) {
      throw new NotFoundException(`No existe un detalle de facturacion con id ${id}`);
    }

    await this.detalleFacturacionRepository.delete(id);
    return detalle;
  }

  async calcularCostoTotalCita(idConsulta: number) {
    // 1. Obtener la consulta y la especialidad del veterinario (base_cost)
    const consulta = await this.agendamientoRepository.findOne({
      where: { id: idConsulta },
      relations: ['veterinario', 'veterinario.specialty'],
    });

    if (!consulta) {
      throw new NotFoundException(`No existe una consulta con id ${idConsulta}`);
    }

    const costoBaseEspecialidad = Number(consulta.veterinario.specialty.base_cost);

    // 2. Obtener las facturas asociadas a esta consulta
    const facturas = await this.facturacionRepository.find({
      where: { idConsulta },
      select: ['id'],
    });

    // Si no hay facturas, devolvemos solo el costo base
    if (!facturas || facturas.length === 0) {
      return {
        idConsulta,
        costoBaseEspecialidad,
        totalTratamientos: 0,
        costoTotalCita: costoBaseEspecialidad,
      };
    }

    // 3. Obtener los detalles (tratamientos) de esas facturas y sumar subtotales
    const idsFacturas = facturas.map((f) => f.id);
    // Necesitamos importar `In` de typeorm para esto... Wait, I need to check if 'In' is imported.
    const detalles = await this.detalleFacturacionRepository
      .createQueryBuilder('detalle')
      .where('detalle.idFactura IN (:...ids)', { ids: idsFacturas })
      .getMany();

    const totalTratamientos = detalles.reduce(
      (acumulado, detalle) => acumulado + Number(detalle.subtotal),
      0,
    );

    return {
      idConsulta,
      costoBaseEspecialidad,
      totalTratamientos,
      costoTotalCita: costoBaseEspecialidad + totalTratamientos,
    };
  }
}
