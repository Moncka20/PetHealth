import { IsString, IsOptional, IsNumber } from "class-validator";

export class CreateTaxonomyDto {

    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsNumber()
    parentId?: number;

}