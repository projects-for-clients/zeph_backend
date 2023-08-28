import { IsNotEmpty, IsString } from "class-validator";

export class EmailPayload {

  @IsNotEmpty()
  @IsString()
  subject: string

  @IsNotEmpty()
  @IsString()
  content: string
}


