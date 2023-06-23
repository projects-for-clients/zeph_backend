import { RequestService } from './../../services/request.service';
import { PrismaService } from '../../prisma/prisma.service';
import { Logger, Injectable, Scope } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RedisService } from 'src/redis/redis.service';

@Injectable({ scope: Scope.REQUEST })
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    private redis: RedisService,
    private prisma: PrismaService,
    private readonly requestService: RequestService,
  ) {}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll() {
    this.logger.log(UsersService.name, this.requestService.getUserId());

    const cached = await this.redis.getCache(UsersService.name);

    // if (cached) {
    //   console.log('returning redis catch....', cached);
    //   return JSON.parse(cached);
    // }

    console.log('call the database');

    const allUsers = await this.prisma.users.findMany();
    // await this.redis.setCache(UsersService.name, allUsers);

    return allUsers;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
