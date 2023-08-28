import { Controller, Get } from "@nestjs/common";

@Controller('email')
export class EmailController {

    @Get()
    async sendEmail() {
        
    }
}