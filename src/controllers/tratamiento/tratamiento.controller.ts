import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateTratamientoDto } from '../../dtos/tratamiento/create-tratamiento.dto';
import { UpdateTratamientoDto } from '../../dtos/tratamiento/update-tratamiento.dto';
import { TratamientoService } from '../../services/tratamiento/tratamiento.service';

@Controller('tratamientos')
export class TratamientoController {
  constructor(private readonly tratamientoService: TratamientoService) {}

  @Post()
  create(@Body() createTratamientoDto: CreateTratamientoDto) {
    return this.tratamientoService.create(createTratamientoDto);
  }

  @Get()
  findAll() {
    return this.tratamientoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tratamientoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTratamientoDto: UpdateTratamientoDto) {
    return this.tratamientoService.update(+id, updateTratamientoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tratamientoService.remove(+id);
  }
}
