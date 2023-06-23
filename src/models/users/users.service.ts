import { RequestService } from './../../services/request.service';
import { PrismaService } from '../../prisma/prisma.service';
import { Logger, Injectable, Scope, CacheTTL } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RedisService } from 'src/redis/redis.service';
import { CacheKey } from '@nestjs/cache-manager';

@Injectable({ scope: Scope.REQUEST })
@CacheKey('users')
@CacheTTL(60 * 1000 * 3600)
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

    const userCache = await this.redis.getCache('users');
    // if (userCache) {
    //   return userCache;
    // }
    const allUsers = await this.prisma.users.findMany();

    const setUsersCache = await this.redis.setCache('users', allUsers);

    console.log({ userCache });
    console.log({ setUsersCache });

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
