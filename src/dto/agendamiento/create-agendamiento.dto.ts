import { IsDateString, IsInt, IsNotEmpty, IsOptional, IsEnum } from 'class-validator';

export class CreateAgendamientoDto {
  @IsDateString()
  @IsNotEmpty()
  fecha_hora: string;

  @IsInt()
  @IsNotEmpty()
  mascota_id: number;

  @IsInt()
  @IsNotEmpty()
  veterinario_id: number;

  @IsEnum(['programada', 'completada', 'cancelada'])
  @IsOptional()
  estado?: string;
}