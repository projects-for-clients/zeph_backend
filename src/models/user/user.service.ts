import { Injectable, Logger, Scope } from '@nestjs/common';
import { user } from '@prisma/client';
import { CrudService } from 'src/services/crud.service';
import { PrismaService } from '../../prisma/prisma.service';
import { UserRequestService } from '../../services/userRequest.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';


@Injectable({ scope: Scope.REQUEST })
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(private prisma: PrismaService) { }

  async findAll() {
    const allUser = await this.prisma.user.findMany();

    // return exclude(allUser, ['hashedPassword', 'updated_at', 'role']);

    return allUser
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    const user = await this.prisma.user.delete({
      where: {
        id,
      },
    });

    return user;
  }
}
