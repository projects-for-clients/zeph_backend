import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { users } from '../drizzle/schema';

@Injectable()
export class UsersService {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {} //private conn: PostgresJsDatabase<Record<string, never>>,

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll() {
    //const allUsers = await this.conn.select().from(users);

    // console.log(allUsers);
    return 'allUsers';
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
