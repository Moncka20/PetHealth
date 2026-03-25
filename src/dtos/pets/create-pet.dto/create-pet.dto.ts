import { IsString, IsNotEmpty, IsDateString, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePetDto {

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsDateString()
  @IsNotEmpty()
  birth_date: string;

  @Type(() => Number)
  @IsInt()
  client_id: number;

  @Type(() => Number)
  @IsInt()
  taxonomy_id: number;
}