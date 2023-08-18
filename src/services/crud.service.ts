import { Injectable, Scope } from "@nestjs/common";
import { Prisma, PrismaClient, user } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
// PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>.account: Prisma.accountDelegate<DefaultArgs>
export class CrudService {

    constructor(private prisma: PrismaService) { }

    async findMany(model: string) {

        this.prisma[model].findMany();



    }

}