import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getUserById(id: number): Promise<User> {
    return this.userRepository.findOne({
      where: { id },
      relations: ['calendarEvents'],
    });
  }

  async createUser(username: string): Promise<User> {
    const user = this.userRepository.create({ username });
    return this.userRepository.save(user);
  }
}
