import { IsString, IsOptional, IsDateString, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdatePetDto {

  @IsString()
  @IsOptional()
  name?: string;

  @IsDateString()
  @IsOptional()
  birth_date?: string;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  owner_id?: number;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  breed_id?: number;
}