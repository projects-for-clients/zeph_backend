import { Body, Controller, Post } from "@nestjs/common";
import { EmailService } from "./Email.Service";
import { EmailPayload } from "./dto";



@Controller('sendEmail')
export class EmailController {

    constructor(private readonly EmailService: EmailService) { }

    @Post()
    async post(@Body() payload: EmailPayload) {
        const { subject, content } = payload
        return this.EmailService.sendAnyEmail(subject, content)

    }
}