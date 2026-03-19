import {
  IsString,
  IsInt,
  IsOptional,
  IsDateString,
  IsEnum,
  IsNotEmpty,
} from 'class-validator';

export enum MetodoPago {
  EFECTIVO = 'efectivo',
  TARJETA = 'tarjeta',
  TRANSFERENCIA = 'transferencia',
  OTRO = 'otro',
}

export enum EstadoFactura {
  PENDIENTE = 'pendiente',
  PAGADA = 'pagada',
  ANULADA = 'anulada',
}

export class CreateFacturacionDto {
  @IsInt()
  @IsNotEmpty()
  idConsulta: number;

  @IsDateString()
  fechaEmision: string;

  @IsOptional()
  @IsDateString()
  fechaVencimiento?: string;

  @IsEnum(MetodoPago)
  metodoPago: MetodoPago;

  @IsOptional()
  @IsEnum(EstadoFactura)
  estado?: EstadoFactura = EstadoFactura.PENDIENTE;

  @IsOptional()
  @IsString()
  observaciones?: string;
}
