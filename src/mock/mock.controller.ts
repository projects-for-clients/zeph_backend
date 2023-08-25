import { faker } from '@faker-js/faker'
import { Controller, Get, Param } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Controller('mock')
export class MockController {

    @Get(':id')
    async get(@Param('id') id: string) {

        const prisma = new PrismaClient()
        const userIds = [1, 2]

        
        const payment = () => {

            
        }


        const tenancy = () => {

            enum Status {
                pending = 'pending',
                approved = 'approved'
            }

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
                userId: userIds[Math.floor(Math.random() * userIds.length)],
                duration: `${Math.floor(Math.random() * (12 - 1) + 1)} Month`,
                created_at: faker.date.past().toISOString(),
                updated_at: faker.date.recent().toISOString(),
                relevant_documents: ['https://res.cloudinary.com/durzzjrom/raw/upload/v1692373112/uploads/TenancyService/users/2/SESA_prayers3_m8trkx.docx']


            }
        }



        const powerOfAttorney = () => {

            enum Status {
                pending = 'pending',
                approved = 'approved'
            }

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
                userId: userIds[Math.floor(Math.random() * userIds.length)],
                duration: `${Math.floor(Math.random() * (12 - 1) + 1)} Month`,
                created_at: faker.date.past().toISOString(),
                updated_at: faker.date.recent().toISOString(),
                relevant_documents: ['https://res.cloudinary.com/durzzjrom/raw/upload/v1692373112/uploads/TenancyService/users/2/SESA_prayers3_m8trkx.docx']

            }
        }

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
        
       


        switch (id) {
            case 'tenancy': 

                 async() => {
                    const data = tenancy()
                    const _tenancy =  await prisma.tenancy.create({
                        data: {
                            ...data
                        }
                    })
                    
                    const {id} = _tenancy


                    const payment = await prisma.payment.create({
                        data: {

                        }
                    })

                }
            
          
            default:
                return tenancy()
        }


    }

}