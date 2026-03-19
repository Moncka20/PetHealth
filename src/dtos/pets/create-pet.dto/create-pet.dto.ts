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
  owner_id: number;

  @Type(() => Number)
  @IsInt()
  breed_id: number;
}