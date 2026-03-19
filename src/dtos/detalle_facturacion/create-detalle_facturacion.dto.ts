import {
  IsInt,
  IsString,
  IsNotEmpty,
  IsNumber,
  Min,
  MaxLength,
} from 'class-validator';

export class CreateDetalleFacturaDto {
  @IsInt()
  @IsNotEmpty()
  idConsulta: number;

  @IsInt()
  @IsNotEmpty()
  idTratamiento: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  concepto: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0.01)
  cantidad: number;
}
