import { IsEnum, IsNotEmpty, IsNumber, IsString, MaxLength, Min } from 'class-validator';
import { TipoTratamiento } from '../../entities/tratamiento/tratamiento.entity';

export class CreateTratamientoDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  nombre: string;

  @IsEnum(TipoTratamiento)
  tipo: TipoTratamiento;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0.01)
  precio: number;
}
