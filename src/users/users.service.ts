import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  findAll(email: string) {
    return this.usersRepository.find({
      where: { email },
    });
  }

  create(name: string, email: string, password: string) {
    const user = this.usersRepository.create({ name, email, password }); // belum menyimpan ke DB
    return this.usersRepository.save(user); // menyimpan ke DB
  }

  async findOne(id: number) {
    if (!id) {
      throw new NotFoundException('User tidak ditemukan!');
    }

    const user = await this.usersRepository.findOneBy({ id });

    return user;
  }

  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id);
    Object.assign(user, attrs);
    return this.usersRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    return this.usersRepository.remove(user);
  }
}
