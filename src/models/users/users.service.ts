import { UserRequestService } from '../../services/userRequest.service';
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
    private readonly UserRequestService: UserRequestService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    await this.redis.del(UsersService.name);
    return 'This action adds a new user';
  }

  async findAll() {
    this.logger.log(UsersService.name, this.UserRequestService.getUserId());

    const cached = await this.redis.get(UsersService.name);

    if (cached) {
      console.log('returning redis catch....', cached);
      return cached;
    }

    console.log('call the database');

    const allUsers = await this.prisma.users.findMany();
    await this.redis.set(UsersService.name, allUsers);

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
