import { UserRequestService } from '../../services/userRequest.service';
import { PrismaService } from '../../prisma/prisma.service';
import { Logger, Injectable, Scope } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';


@Injectable({ scope: Scope.REQUEST })
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(private prisma: PrismaService) { }

  async findAll() {
    const allUsers = await this.prisma.users.findMany();
    
    return allUsers;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    const user = await this.prisma.users.delete({
      where: {
        id,
      },
    });

    return user;
  }
}
