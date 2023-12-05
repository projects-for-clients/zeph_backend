import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

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


    @IsOptional()
    @IsBoolean()
    isPaid: boolean;

    @IsOptional()
    @IsNumber()
    @IsNotEmpty()
    amount: string;

    @IsOptional()
    @IsNumber()
    @IsNotEmpty()
    paymentRefId: number;


    // @IsArray()
    // relevant_documents: string[];


}