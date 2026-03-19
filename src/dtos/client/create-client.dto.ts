import { IsString, IsEmail, IsOptional } from 'class-validator'


export class CreateClientDto {
    @IsString()
    first_name: string;

    @IsString()
    @IsOptional()
    last_name: string;

    @IsString()
    document_id: string;

    @IsString()
    address: string;

    @IsEmail()
    email: string;

    @IsString()
    @IsOptional()
    phone?: string;

    @IsString()
    @IsOptional()
    notes: string;

}