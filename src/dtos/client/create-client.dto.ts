import { IsString, IsEmail, IsOptional, Length } from 'class-validator'


export class CreateClientDto {
    @IsString()
    @Length(2, 50)
    firstName: string;

    @IsString()
    @IsOptional()
    lastName?: string;

    @IsString()
    @Length(5, 20)
    documentId: string;

    @IsString()
    address: string;

    @IsEmail()
    email: string;

    @IsString()
    @IsOptional()
    @Length(7, 15)
    phone?: string;

    @IsString()
    @IsOptional()
    notes?: string;

}