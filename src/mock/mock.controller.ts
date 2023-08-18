import { faker } from '@faker-js/faker'
import { Controller, Get } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Controller('mock')
export class MockController {

    @Get()
    async get() {

        const prisma = new PrismaClient()

        const createFakeTenancy = () => {

            enum Status {
                PENDING = 'PENDING',
                APPROVED = 'APPROVED'
            }

            return {
                landlord_name: faker.person.fullName(),
                landlord_address: faker.location.streetAddress(),
                tenant_name: faker.person.fullName(),
                tenant_address: faker.location.streetAddress(),
                property_description: faker.word.sample({
                    length: 20
                }),
                status: Math.random() * 3 > 1.5 ? Status.PENDING : Status.APPROVED,
                amount: faker.finance.amount({
                    min: 500,
                    max: 200000
                }),
                duration: `${Math.floor(Math.random() * (12 - 1) + 1)} Month`,
                created_at: faker.date.past().toISOString(),
                updated_at: faker.date.recent().toISOString(),

            }
        }

        //Build this in golang, 
        // it took 4m,35seconds in nestjs
        const seedDb = async () => {
            const computed = []

            // for (let i = 0; i < 1000; i++) {

            // const data = createFakeTenancy()

            // const res = await prisma.tenancy.create({
            //     data: {
            //         ...data,
            //         relevant_documents: ['']
            //     }
            // })

            // computed.push(res)
            // }

            return computed;

        }

        const result = await seedDb()

        console.log({ result })
        return result
    }

}