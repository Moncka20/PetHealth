import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { AgendamientoService } from '../services/agendamiento.service';
import { CreateAgendamientoDto } from '../dtos/agendamiento/create-agendamiento.dto';
import { UpdateAgendamientoDto } from '../dtos/agendamiento/update-agendamiento.dto';

@Controller('agendamientos')
export class AgendamientoController {
    constructor(private readonly agendamientoService: AgendamientoService) { }

    @Post()
    create(@Body() dto: CreateAgendamientoDto) {
        return this.agendamientoService.create(dto);
    }

    @Get()
    findAll() {
        return this.agendamientoService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.agendamientoService.findOne(id);
    }

    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateAgendamientoDto) {
        return this.agendamientoService.update(id, dto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.agendamientoService.remove(id);
    }
}