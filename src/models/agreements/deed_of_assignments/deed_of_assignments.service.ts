import { UserRequestService } from 'src/services/userRequest.service';
import { ForbiddenException, Injectable } from "@nestjs/common";
import { CreateDto, UpdateTdo } from "./dto";
import { PrismaService } from "src/prisma/prisma.service";
import { RedisService } from "src/redis/redis.service";
import * as fs from "fs/promises";
import * as path from "path";
import { UploadedFilesService } from "src/services/uploadFiles.service";


@Injectable()
export class DeedOfAssignmentsService {
  constructor(
    // @Inject(CACHE_MANAGER) private readonly cache: Cache,
    private prisma: PrismaService,
    private uploadFiles: UploadedFilesService,
    private userRequest: UserRequestService

  ) { }

  private userId = this.userRequest.getUserId();


  async create(createTenantDto: CreateDto, files: Array<Express.Multer.File>) {


    const folderPath = path.join("uploads", TenantsService.name);
    const currDir = path.join(process.cwd(), folderPath);

    await fs.mkdir(folderPath, {
      recursive: true,
    });

    const cleanUpPaths = []

    // rome-ignore lint/suspicious/noExplicitAny: <explanation>
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


      const tenant = await this.prisma.tenants.create({
        data: {
          ...createTenantDto,
          relevant_documents,
          userId: this.userId
        },
      });



      if (!tenant) throw new ForbiddenException('Unable to create lease');

      return tenant;
    }
    catch (err) {

      console.log({ err })
      throw new ForbiddenException("Error while storing files");
    }

  }

  async findAll() {
    const all = await this.prisma.tenants.findMany();

    if (!all) {
      throw new ForbiddenException("No tenants found")
    }

    return all
  }

  async findOne(id: number) {
    const one = await this.prisma.tenants.findUnique({
      where: {
        id,
      },
    });

    if (!one) {

      throw new ForbiddenException("Tenant not found")
    }

    return one
  }

  async update(id: number, updateTenantDto: UpdateTdo) {
    console.log({ id })
    const find = await this.prisma.tenants.findUnique({
      where: {
        id,
      },
    });

    if (!find) {
      throw new ForbiddenException('Tenant not found');
    }

    const update = await this.prisma.tenants.update({
      where: {
        id,
      },
      data: {
        ...find,
        ...updateTenantDto,
      },
    });

    if (!update) {
      throw new ForbiddenException("Unable to update")
    }

    return update
  }

  async delete(id: number) {
    const remove = await this.prisma.tenants.delete({
      where: {
        id,
      },
    });

    if (!remove) {
      throw new ForbiddenException("Unable to delete")
    }

    return remove
  }
}
