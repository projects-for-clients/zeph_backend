import { Module } from "@nestjs/common";
import { EmailController } from "./Email.Controller";
import { EmailService } from "./Email.Service";

@Module({
    imports: [EmailController],
    providers: [EmailService]
})

export class EmailModule { }