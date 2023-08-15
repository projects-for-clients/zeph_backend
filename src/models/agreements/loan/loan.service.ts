import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserRequestService } from 'src/services/userRequest.service';
import { createDto, updateDto } from './dto';

@Injectable()
export class LoanService {
    constructor(private prisma: PrismaService, private userRequest: UserRequestService) { }

    async create(createLoanDto: createDto) {
        const userId = this.userRequest.getUserId();

        const loan = await this.prisma.loan.create({
            data: {
                ...createLoanDto,
                userId,
            },
        });

        return loan;
    }

    async findAll() {
        const allLoan = await this.prisma.loan.findMany();

        return allLoan;
    }

    async findOne(id: number) {
        const loan = await this.prisma.loan.findUnique({
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
        const find = await this.prisma.loan.findUnique({
            where: {
                id,
            },
        });

        if (!find) {
            throw new ForbiddenException('Loan not found');
        }

        const loan = await this.prisma.loan.update({
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

        const loan = await this.prisma.loan.delete({
            where: {
                id,
            },
        }).catch(() => {
            throw new ForbiddenException("Loan not found")
        })

        return loan;
    }
}
