import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateDto {
    @IsString()
    @IsNotEmpty()
    assignor_name: string;

    @IsString()
    @IsNotEmpty()
    assignor_address: string;

    @IsString()
    @IsNotEmpty()
    assignee_name: string;

    @IsString()
    @IsNotEmpty()
    assignee_address: string;



    @IsString()
    @IsNotEmpty()
    property_description: string;


}


export class UpdateTdo {

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    assignor_name: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    assignor_address: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    assignee_name: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    assignee_address: string;


    @IsOptional()
    @IsString()
    @IsNotEmpty()
    property_description: string;

    // @IsArray()
    // relevant_documents: string[];


}
