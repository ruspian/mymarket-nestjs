import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  findAll() {
    return this.usersRepository.find();
  }

  create(name: string, email: string, password: string) {
    const user = this.usersRepository.create({ name, email, password }); // belum menyimpan ke DB
    return this.usersRepository.save(user); // menyimpan ke DB
  }

  findOne(id: number) {
    return this.usersRepository.findOneBy({ id });
  }

  update() {}

  remove() {}
}
