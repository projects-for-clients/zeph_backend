import { faker } from '@faker-js/faker'
import { Controller, Get, Param } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Controller('mock')
export class MockController {

    @Get(':id')
    async get(@Param('id') id: string) {

        const prisma = new PrismaClient()
        const userIds = [1, 2]

        enum Status {
            pending = 'pending',
            approved = 'approved'
        }

        const payment = () => {
            enum ModelType {
                contract = 'contract',
                deed_of_assignment = 'deed_of_assignment',
                lease = 'lease',
                power_of_attorney = 'power_of_attorney',
                loan = 'loan',
                sale = 'sale',
                tenancy = 'tenancy'
            }

            const modelType = [ModelType.contract, ModelType.deed_of_assignment, ModelType.lease, ModelType.loan, ModelType.power_of_attorney, ModelType.sale, ModelType.tenancy]

            return {
                model: ModelType[modelType[Math.floor(Math.random() * modelType.length)]],
                userId: userIds[Math.floor(Math.random() * userIds.length)],
            }

        }



        const loan = () => {


            return {
                borrower_name: faker.person.fullName(),
                lender_name: faker.person.fullName(),
                isPaid: Math.random() * 3 > 1.5 ? true : false,
                status: Math.random() * 3 > 1.5 ? Status.pending : Status.approved,
                amount: faker.finance.amount({
                    min: 500,
                    max: 200000
                }),
                duration: `${Math.floor(Math.random() * (12 - 1) + 1)} Month`,
                interestRate: Math.random() * 100 + 1,
                userId: userIds[Math.floor(Math.random() * userIds.length)],
                created_at: faker.date.past().toISOString(),
                updated_at: faker.date.recent().toISOString(),



            }
        }
        const sale = () => {


            return {
                vendor_name: faker.person.fullName(),
                purchaser_name: faker.person.fullName(),
                property_description: faker.word.sample({
                    length: 20
                }),
                isPaid: Math.random() * 3 > 1.5 ? true : false,
                status: Math.random() * 3 > 1.5 ? Status.pending : Status.approved,
                amount: faker.finance.amount({
                    min: 500,
                    max: 200000
                }),
                userId: userIds[Math.floor(Math.random() * userIds.length)],

                created_at: faker.date.past().toISOString(),
                updated_at: faker.date.recent().toISOString(),
                relevant_documents: ['https://res.cloudinary.com/durzzjrom/raw/upload/v1692373112/uploads/TenancyService/users/2/SESA_prayers3_m8trkx.docx']


            }
        }
        const power_of_attorney = () => {


            return {
                assignor_name: faker.person.fullName(),
                assignor_address: faker.location.streetAddress(),
                assignee_name: faker.person.fullName(),
                assignee_address: faker.location.streetAddress(),
                property_description: faker.word.sample({
                    length: 20
                }),
                isPaid: Math.random() * 3 > 1.5 ? true : false,
                status: Math.random() * 3 > 1.5 ? Status.pending : Status.approved,
                amount: faker.finance.amount({
                    min: 500,
                    max: 200000
                }),
                userId: userIds[Math.floor(Math.random() * userIds.length)],

                created_at: faker.date.past().toISOString(),
                updated_at: faker.date.recent().toISOString(),
                relevant_documents: ['https://res.cloudinary.com/durzzjrom/raw/upload/v1692373112/uploads/TenancyService/users/2/SESA_prayers3_m8trkx.docx']


            }
        }
        const lease = () => {


            return {
                leasor_name: faker.person.fullName(),
                leasor_address: faker.location.streetAddress(),
                leasee_name: faker.person.fullName(),
                leasee_address: faker.location.streetAddress(),
                property_description: faker.word.sample({
                    length: 20
                }),
                isPaid: Math.random() * 3 > 1.5 ? true : false,
                status: Math.random() * 3 > 1.5 ? Status.pending : Status.approved,
                amount: faker.finance.amount({
                    min: 500,
                    max: 200000
                }),
                userId: userIds[Math.floor(Math.random() * userIds.length)],
                duration: `${Math.floor(Math.random() * (12 - 1) + 1)} Month`,
                created_at: faker.date.past().toISOString(),
                updated_at: faker.date.recent().toISOString(),
                relevant_documents: ['https://res.cloudinary.com/durzzjrom/raw/upload/v1692373112/uploads/TenancyService/users/2/SESA_prayers3_m8trkx.docx']


            }
        }

        const deed_of_assignment = () => {


            return {
                donor_name: faker.person.fullName(),
                donor_address: faker.location.streetAddress(),
                donee_name: faker.person.fullName(),
                donee_address: faker.location.streetAddress(),
                property_description: faker.word.sample({
                    length: 20
                }),
                isPaid: Math.random() * 3 > 1.5 ? true : false,
                status: Math.random() * 3 > 1.5 ? Status.pending : Status.approved,
                amount: faker.finance.amount({
                    min: 500,
                    max: 200000
                }),
                userId: userIds[Math.floor(Math.random() * userIds.length)],

                created_at: faker.date.past().toISOString(),
                updated_at: faker.date.recent().toISOString(),
                relevant_documents: ['https://res.cloudinary.com/durzzjrom/raw/upload/v1692373112/uploads/TenancyService/users/2/SESA_prayers3_m8trkx.docx']


            }
        }
        const tenancy = () => {


            return {
                landlord_name: faker.person.fullName(),
                landlord_address: faker.location.streetAddress(),
                tenant_name: faker.person.fullName(),
                tenant_address: faker.location.streetAddress(),
                property_description: faker.word.sample({
                    length: 20
                }),
                status: Math.random() * 3 > 1.5 ? Status.pending : Status.approved,
                amount: faker.finance.amount({
                    min: 500,
                    max: 200000
                }),
                isPaid: Math.random() * 3 > 1.5 ? true : false,

                userId: userIds[Math.floor(Math.random() * userIds.length)],
                duration: `${Math.floor(Math.random() * (12 - 1) + 1)} Month`,
                created_at: faker.date.past().toISOString(),
                updated_at: faker.date.recent().toISOString(),
                relevant_documents: ['https://res.cloudinary.com/durzzjrom/raw/upload/v1692373112/uploads/TenancyService/users/2/SESA_prayers3_m8trkx.docx']


            }
        }




        // const powerOfAttorney = () => {


        //Build this in golang, 
        // it took 4m,35seconds in nestjs
        // const createTenancy = async () => {
        //     const computed = []

        //     for (let i = 0; i < 100; i++) {

        //     const data = createFakeTenancy()

        //     const res = await prisma.tenancy.create({
        //         data: {
        //             ...data,
        //         }
        //     })

        //     computed.push(res)
        //     }

        //     return computed;

        // }


        const paymentData = payment()

        const transaction = async (model: string, data: any) => {

            const computed = []
        
            for (let i = 0; i < 100; i++) {



                const res = await prisma.$transaction(async (tx) => {

                    const create = await tx[model].create({
                        data: {
                            ...data
                        }
                    })

                    const { id } = create


                    const payment = await tx.payment.create({
                        data: {
                            ...paymentData,
                            modelId: id,
                            amount: data.amount,
                            paymentRefId: Math.random() * 100
                        }
                    })

                    console.log({ payment })

                    const update = await tx[model].update({
                        where: {
                            id
                        },
                        data: {
                            paymentRefId: payment.paymentRefId
                        }

                    })

                    return {
                        update
                    }

                })

                computed.push(res)
            
            }

            return computed;

        
        }

        if (id === 'tenancy') {
            const data = tenancy()

            return await transaction('tenancy', data)

        }

        if (id === 'lease') {
            const data = lease()

            return await transaction('lease', data)

        }

        if (id === 'power_of_attorney') {
            const data = power_of_attorney()

            return await transaction('power_of_attorney', data)

        }

        if (id === 'deed_of_assignment') {
            const data = deed_of_assignment()

            return await transaction('deed_of_assignment', data)

        }

        if (id === 'loan') {
            const data = loan()

            return await transaction('loan', data)
        }

        if (id === 'sale') {
            const data = sale()

            return await transaction('sale', data)
        }

        // if(id === 'contract'){
        //     const data = contract()

        //     return await transaction('contract', data)

        // }
    }






}