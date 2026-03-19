import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TratamientoController } from '../../controllers/tratamiento/tratamiento.controller';
import { TratamientoEntity } from '../../entities/tratamiento/tratamiento.entity';
import { TratamientoService } from '../../services/tratamiento/tratamiento.service';

@Module({
  imports: [TypeOrmModule.forFeature([TratamientoEntity])],
  controllers: [TratamientoController],
  providers: [TratamientoService],
})
export class TratamientoModule {}
