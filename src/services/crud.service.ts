import { Injectable, Scope } from "@nestjs/common";
import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
// PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>.account: Prisma.accountDelegate<DefaultArgs>
export class CrudService<T extends Prisma.ModelName> {

    constructor(private prisma: PrismaService, private readonly model: T) { }

    async findMany() {
        const many = this.prisma[this.model].findMany

        console.log({ many })

        return many

    }

}