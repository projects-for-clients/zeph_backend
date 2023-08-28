import { Module } from "@nestjs/common";
import { EmailController } from "./Email.Controller";
import { EmailService } from "./Email.Service";

@Module({
    controllers: [EmailController],
    providers: [EmailService]
})

export class EmailModule { }