/* eslint-disable @typescript-eslint/no-var-requires */
// import path from "path";
import * as fs from "fs/promises";

import { ForbiddenException, Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { CreateDto, UpdateTenancyTdo } from "src/models/agreements/tenancy/dto";
import { PrismaService } from "src/prisma/prisma.service";
import { exclude, excludeNested } from "src/utils/exclude";
import { IQuery } from "types/types";
import { UploadedFilesService } from "./uploadFiles.service";
import { UserRequestService } from "./userRequest.service";
const path = require("path");

@Injectable()
// PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>.account: Prisma.accountDelegate<DefaultArgs>
export class CrudService {
    private userId = this.userRequest.getUserId();
    private userSession = this.userRequest.getUser()

    constructor(private prisma: PrismaService, private uploadFiles: UploadedFilesService,
        private userRequest: UserRequestService,) { }

    async findMany(modelName: string, query: IQuery) {


        // const _prisma = this.prisma[modelName as any] as any
        const _prisma: Prisma.tenancyDelegate<DefaultArgs> = this.prisma[modelName as any] as any


        const { from, to, key, value, page, take, perPage } = query


        const _from = from ? new Date(from) : new Date(0)

        const _to = to ? new Date(to) : new Date()

        const _page = Number(page) || 1
        const _take = Number(take) || 10
        const _perPage = Number(perPage) || 10

        const { role } = this.userSession


        let where = {}

        if (key) {
            where = {
                [key]: {
                    contains: value,
                    mode: 'insensitive'
                },
            }

            if (key === 'amount') {

                where = {
                    ...where,
                    amount: {
                        gte: Number(value) || 0,
                    },
                }
            }


        }


        try {


            if (role === 'customer') {
                where = {
                    ...where,
                    userId: {
                        equals: this.userId,
                    },
                }

            }

            const found = await _prisma.findMany({
                skip: (_page - 1) * _perPage,
                take: _take,
                orderBy: {
                    updated_at: 'desc'
                },
                where: {
                    ...where,

                    created_at: {
                        gte: _from,
                        lte: _to
                    }
                },
                include: {
                    user: modelName !== 'user' && role === 'superAdmin'
                }
            })



            const count = await _prisma.count({
                where: {
                    ...where,

                    created_at: {
                        gte: _from,
                        lte: _to
                    }
                },
            })

            const _data = modelName === 'user' ? exclude(found as any, ['hashedPassword']) : excludeNested(found, ["hashedPassword"], role)





            return {
                data: _data,
                count,
                page: _page,
                take: _take,
                totalPages: Math.ceil(count / _perPage),
                perPage: _perPage
            }
        }
        catch (e) {
            console.log({ e })
            throw new ForbiddenException("Invalid Query, Check the key");


        }

    }

    async create(modelName: string, createData: CreateDto, files: Express.Multer.File[]) {

        const _prisma: Prisma.tenancyDelegate<DefaultArgs> = this.prisma[modelName as any] as any

        const folderPath = path.join("uploads", modelName);
        const currDir = path.join(process.cwd(), folderPath);

        await fs.mkdir(folderPath, {
            recursive: true,
        });

        const cleanUpPaths = []


        const uploadedFiles: any[] = []
        const storeFileHandler = async (path: string) => {
            let isError = false;

            for (const key in files) {
                const file = files[key];
                const writeTo = `${path}/${file.originalname}`;

                cleanUpPaths.push(writeTo);
                await fs.writeFile(writeTo, file.buffer).catch(() => {
                    isError = true;
                });


                const toUpload = await this.uploadFiles.uploadBasic(`${currDir}/${file.originalname}`, `${folderPath}/users/${this.userId}`)

                uploadedFiles.push(toUpload);


            }

            return isError;
        };



        try {

            await storeFileHandler(folderPath);

            const executed = await Promise.all(uploadedFiles.map(async (file) => {
                return (await file)()
            }));

            cleanUpPaths.map(async (writeTo) => {
                await fs.unlink(writeTo)
            })


            const relevant_documents: string[] = executed.map((fileData) => fileData.secure_url)


            const found = await _prisma.create({
                data: {
                    ...createData,
                    relevant_documents,
                    userId: this.userId
                },
            });



            if (!found) { throw new ForbiddenException(`Unable to create ${modelName}`); }

            return found;
        }
        catch (err) {

            console.log({ err })
            throw new ForbiddenException("Error while storing files");
        }

    }

    async findOne(modelName: string, id: number) {

        const _prisma: Prisma.tenancyDelegate<DefaultArgs> = this.prisma[modelName as any] as any


        const { role } = this.userSession

        let where = {}

        if (role === 'customer') {
            where = {
                userId: {
                    equals: this.userId,
                },
            }

        }

        const one = await _prisma.findUnique({
            where: {
                ...where,
                id
            }
        });



        if (!one) {

            throw new ForbiddenException(`${modelName} not found`)
        }

        return one;
    }

    async update(modelName: string, id: number, updateData: any) {

        const _prisma = this.prisma[modelName as any] as any

        const { role } = this.userSession

        let where = {}

        if (role === 'customer') {
            where = {
                userId: {
                    equals: this.userId,
                },
            }

        }

        const find = await _prisma.findUnique({
            where: {
                ...where,
                id,
            },
        });

        if (!find) {
            throw new ForbiddenException(`${modelName} not found`)

        }


        let update = {}

        if (updateData.isPaid) {


            update = _prisma.update({
                where: {
                    id,

                },
                data: {
                    ...find,
                    ...updateData,
                    status: "PAID"
                },
            });
        }





        if (!update) {
            throw new ForbiddenException("Unable to update")
        }

        return update

    }

    async delete(modelName: string, id: number) {
        const _prisma: Prisma.tenancyDelegate<DefaultArgs> = this.prisma[modelName as any] as any

        const { role } = this.userSession

        let where = {}

        if (role === 'customer') {
            where = {
                userId: {
                    equals: this.userId,
                },
            }

        }

        const find = await _prisma.findUnique({
            where: {
                ...where,
                id,

            },
        });

        if (!find) {
            throw new ForbiddenException(`${modelName} not found`)

        }

        const deleteOne = await _prisma.delete({
            where: {

                id,
            },
        });

        if (!deleteOne) {
            throw new ForbiddenException("Unable to delete")
        }

        return deleteOne


    }


}