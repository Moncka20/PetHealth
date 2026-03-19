import { Injectable } from '@nestjs/common';
import { CreateFacturacionDto } from '../dtos/facturacion/create-facturacion.dto';
import { UpdateFacturacionDto } from '../dtos/facturacion/update-facturacion.dto';

@Injectable()
export class FacturacionService {
  create(createFacturacionDto: CreateFacturacionDto) {
    return 'This action adds a new facturacion';
  }

  findAll() {
    return `This action returns all facturacion`;
  }

  findOne(id: number) {
    return `This action returns a #${id} facturacion`;
  }

  update(id: number, updateFacturacionDto: UpdateFacturacionDto) {
    return `This action updates a #${id} facturacion`;
  }

  remove(id: number) {
    return `This action removes a #${id} facturacion`;
  }
}
