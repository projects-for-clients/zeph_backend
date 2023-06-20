import { Injectable } from '@nestjs/common';

@Injectable()
export class DrizzleService {
  create() {
    console.log('This action adds a new user');
    return 'This action adds a new user';
  }
}
