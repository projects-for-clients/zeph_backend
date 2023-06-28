import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateDto {
    @IsString()
    @IsNotEmpty()
    donor_name: string;

    @IsString()
    @IsNotEmpty()
    donor_address: string;

    @IsString()
    @IsNotEmpty()
    donee_name: string;

    @IsString()
    @IsNotEmpty()
    donee_address: string;



    @IsString()
    @IsNotEmpty()
    property_description: string;


}


export class UpdateTdo {

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    donor_name: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    donor_address: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    donee_name: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    donee_address: string;


    @IsOptional()
    @IsString()
    @IsNotEmpty()
    property_description: string;

    // @IsArray()
    // relevant_documents: string[];


}
