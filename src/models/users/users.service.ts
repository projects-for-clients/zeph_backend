import { PrismaService } from '../../prisma/prisma.service';
import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER, CacheKey, CacheTTL } from '@nestjs/cache-manager';

@Injectable()
export class UsersService {
  constructor(
    // @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private prisma: PrismaService,
  ) {}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll() {
    const allUsers = await this.prisma.users.findMany();

    // await this.cacheManager.set('key', { name: 'Hello' });
    // const cached = await this.cacheManager.get('key');

    // console.log(cached);

    // return cached;
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
