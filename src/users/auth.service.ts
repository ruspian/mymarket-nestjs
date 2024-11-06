import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from './users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async register(name: string, email: string, password: string) {
    // cek apakah ada user dengan email yang sama
    const users = await this.usersService.findAll(email);

    if (users.length) {
      throw new BadRequestException('Email sudah digunakan!');
    }

    // hash password user

    // simpan user ke database
  }
}
