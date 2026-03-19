import { Controller, Get, Post, Put, Body, Param, ParseIntPipe } from '@nestjs/common';
import { medicbodyservice } from '../../Service/medicbody/medicbody.service';
import { createspecialtydto } from '../../dto/medicbody/create-specialty.dto';

@Controller('medicbody')
export class medicbodycontroller {

  constructor(private readonly service: medicbodyservice) {}
  

  

  @Post('specialty')
  create_specialty(@Body() body: createspecialtydto) {
    return this.service.create_specialty(body);
  }

  @Get('specialty')
  get_specialties() {
    return this.service.get_specialties();
  }

  @Post('veterinarian')
  create_veterinarian(@Body() body: any) {
    return this.service.create_veterinarian(body);
  }

  @Get('veterinarian')
  get_veterinarians() {
    return this.service.get_veterinarians();
  }

  @Put('specialty/:id')
  update_specialty(@Param('id', ParseIntPipe) id: number, @Body() body: createspecialtydto) {
    return this.service.update_specialty(id, body);
  }

  @Put('veterinarian/:id')
  update_veterinarian(@Param('id', ParseIntPipe) id: number, @Body() body: any) {
    return this.service.update_veterinarian(id, body);
  }
}