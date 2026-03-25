import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDetalleFacturaDto } from '../../dtos/detalle_facturacion/create-detalle_facturacion.dto';
import { UpdateDetalleFacturaDto } from '../../dtos/detalle_facturacion/update-detalle_facturacion.dto';
import { DetalleFacturacionEntity } from '../../entities/detalle_facturacion/detalle_facturacion.entity';
import { facturacionEntity } from '../../entities/facturacion/facturacion.entity';
import { TratamientoEntity } from '../../entities/tratamiento/tratamiento.entity';

@Injectable()
export class DetalleFacturacionService {
  constructor(
    @InjectRepository(DetalleFacturacionEntity)
    private detalleFacturacionRepository: Repository<DetalleFacturacionEntity>,
    @InjectRepository(facturacionEntity)
    private facturacionRepository: Repository<facturacionEntity>,
    @InjectRepository(TratamientoEntity)
    private tratamientoRepository: Repository<TratamientoEntity>,
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
}
