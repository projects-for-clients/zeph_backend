import { Injectable } from '@nestjs/common';
import { CreateUniversity } from 'src/dto/university.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UniversityService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return this.prisma.university.findMany();
  }

  async getOne(id: number) {
    const university = await this.prisma.university.findFirst({
      where: { id },
    });
    return university;
  }

  async create(dto: CreateUniversity) {
    const uni = await this.prisma.university.create({
      data: {
        title: dto.title,
        description: dto.description,
        imageUrl: dto.imageUrl,
        majors: dto.majors,
        location: dto.location,
      },
    });

    return uni;
  }
  async update(id: number, dto: CreateUniversity) {
    const uni = await this.prisma.university.update({
      where: { id },
      data: {
        title: dto.title,
        description: dto.description,
        imageUrl: dto.imageUrl,
        majors: dto.majors,
        location: dto.location,
      },
    });

    return uni;
  }

  async delete(id: number) {
    const uni = await this.prisma.university.delete({
      where: { id },
    });

    return uni;
  }
}
