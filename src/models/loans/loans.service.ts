import { UserRequestService } from 'src/services/userRequest.service';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { createDto, updateDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LoansService {
    constructor(private prisma: PrismaService, private userRequest: UserRequestService) { }

    async create(createLoanDto: createDto) {
        const userId = this.userRequest.getUserId();

        const loan = await this.prisma.loans.create({
            data: {
                ...createLoanDto,
                userId,
            },
        });

        return loan;
    }

    async findAll() {
        const allLoans = await this.prisma.loans.findMany();

        return allLoans;
    }

    async findOne(id: number) {
        const loan = await this.prisma.loans.findUnique({
            where: {
                id,
            },
        });

        if (!loan) {
            throw new ForbiddenException('Loan not found');
        }


        return loan;
    }

    async update(id: number, updateLoanDto: updateDto) {
        const find = await this.prisma.loans.findUnique({
            where: {
                id,
            },
        });

        if (!find) {
            throw new ForbiddenException('Loan not found');
        }

        const loan = await this.prisma.loans.update({
            where: {
                id,
            },
            data: {
                ...find,
                ...updateLoanDto,
            },
        });



        return loan;
    }

    async delete(id: number) {

        const loan = await this.prisma.loans.delete({
            where: {
                id,
            },
        }).catch(() => {
            throw new ForbiddenException("Loan not found")
        })

        return loan;
    }
}
