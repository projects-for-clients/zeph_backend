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

        const _prisma: Prisma.tenancyDelegate<DefaultArgs> = this.prisma[modelName as any] as any


        const { from, to, key, value, page, take, perPage } = query

        const _from = new Date(from) ?? new Date()

        const _to = new Date(to || '')

        const _page = Number(page) || 1
        const _take = Number(take) || 10
        const _perPage = Number(perPage) || 10

        const { role } = this.userSession


        let found;


        if (from || to) {

            found = await _prisma.findMany({
                skip: (_page - 1) * _perPage,
                take: _take,
                where: {
                    created_at: {
                        gte: _from,
                        lte: _to
                    }
                }
            })

        }

        if (key && value) {
            console.log({ key, value })
            found = await _prisma.findMany({
                skip: (_page - 1) * _perPage,
                take: _take,
                where: {
                    [key]: {
                        contains: value
                    }
                }
            })

            console.log({found})

        }
        else {



            found = await _prisma.findMany({
                skip: (_page - 1) * _perPage,
                take: _take,
                include: {
                    user: modelName !== 'user' && role === 'superAdmin'
                }
            })
        }


        const count = await _prisma.count()

        console.log({ found })

        const _data = modelName === 'user' ? exclude(found, ['hashedPassword']) : excludeNested(found, ["hashedPassword"])



        return {
            data: _data,
            count,
            page: _page,
            take: _take,
            totalPages: Math.ceil(count / _perPage),
            perPage: _perPage
        }

    }

    async create(modelName: string, createData: CreateDto, files: Express.Multer.File[]) {

        console.log({ path })

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

        const one = await _prisma.findUnique({
            where: {
                id,
            }
        });



        if (!one) {

            throw new ForbiddenException(`${modelName} not found`)
        }

        return one;
    }

    async update(modelName: string, id: number, updateData: UpdateTenancyTdo) {

        const _prisma: Prisma.tenancyDelegate<DefaultArgs> = this.prisma[modelName as any] as any

        const find = await _prisma.findUnique({
            where: {
                id,
            },
        });

        if (!find) {
            throw new ForbiddenException(`${modelName} not found`)

        }

        const update = await _prisma.update({
            where: {
                id,
            },
            data: {
                ...find,
                ...updateData,
            },
        });

        if (!update) {
            throw new ForbiddenException("Unable to update")
        }

        return update

    }

    async delete(modelName: string, id: number) {
        const _prisma: Prisma.tenancyDelegate<DefaultArgs> = this.prisma[modelName as any] as any

        const find = await _prisma.findUnique({
            where: {
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