import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClientService } from '../../services/client/client.service';
import { CreateClientDto } from '../../dtos/client/create-client.dto';
import { UpdateClientDto } from '../../dtos/client/update-client.dto';

@Controller('Client')
export class ClientController {
  constructor(private readonly ClientService: ClientService) {}

  @Post()
  create(@Body() createClientDto: CreateClientDto) {
    return this.ClientService.create(createClientDto);
  }

  @Get()
  findAll() {
    return this.ClientService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ClientService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.ClientService.update(+id, updateClientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ClientService.remove(+id);
  }
}