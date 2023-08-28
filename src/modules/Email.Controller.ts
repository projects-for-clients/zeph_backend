import { Controller, Post } from "@nestjs/common";

@Controller('sendEmail')
export class EmailController {


    @Post()
    async post() {

        return 'hello';

    }
}