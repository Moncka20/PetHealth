import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FacturacionService } from '../services/facturacion.service';
import { CreateFacturacionDto } from '../dtos/facturacion/create-facturacion.dto';
import { UpdateFacturacionDto } from '../dtos/facturacion/update-facturacion.dto';

@Controller('facturacion')
export class FacturacionController {
  constructor(private readonly facturacionService: FacturacionService) {}

  @Post()
  create(@Body() createFacturacionDto: CreateFacturacionDto) {
    return this.facturacionService.create(createFacturacionDto);
  }

  @Get()
  findAll() {
    return this.facturacionService.findAll();
  }

  @Get('costo-total/:idConsulta/:idEspecialidad')
  calcularCostoTotalCita(
    @Param('idConsulta') idConsulta: string,
    @Param('idEspecialidad') idEspecialidad: string,
  ) {
    return this.facturacionService.calcularCostoTotalCita(+idConsulta, +idEspecialidad);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.facturacionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFacturacionDto: UpdateFacturacionDto) {
    return this.facturacionService.update(+id, updateFacturacionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.facturacionService.remove(+id);
  }
}
