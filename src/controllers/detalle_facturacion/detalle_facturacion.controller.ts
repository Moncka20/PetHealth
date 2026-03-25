import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateDetalleFacturaDto } from '../../dtos/detalle_facturacion/create-detalle_facturacion.dto';
import { UpdateDetalleFacturaDto } from '../../dtos/detalle_facturacion/update-detalle_facturacion.dto';
import { DetalleFacturacionService } from '../../services/detalle_facturacion/detalle_facturacion.service';

@Controller('detalle-facturacion')
export class DetalleFacturacionController {
  constructor(private readonly detalleFacturacionService: DetalleFacturacionService) {}

  @Post()
  create(@Body() createDetalleFacturaDto: CreateDetalleFacturaDto) {
    return this.detalleFacturacionService.create(createDetalleFacturaDto);
  }

  @Get()
  findAll() {
    return this.detalleFacturacionService.findAll();
  }

  @Get('costo-total/:idConsulta')
  calcularCostoTotalCita(@Param('idConsulta') idConsulta: string) {
    return this.detalleFacturacionService.calcularCostoTotalCita(+idConsulta);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.detalleFacturacionService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDetalleFacturaDto: UpdateDetalleFacturaDto,
  ) {
    return this.detalleFacturacionService.update(+id, updateDetalleFacturaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.detalleFacturacionService.remove(+id);
  }
}
