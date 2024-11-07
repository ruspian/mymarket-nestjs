import { Body, Controller, Get, Post, Session } from '@nestjs/common';
import { LoginUserDto } from 'src/auth/dtos/login-user.dto';
import { createUserDto } from 'src/users/dtos/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from 'src/users/dtos/user.dto';

@Controller('auth')
@Serialize(UserDto)
export class AuthController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('/register')
  async register(@Body() body: createUserDto, @Session() session: any) {
    const user = await this.authService.register(
      body.name,
      body.email,
      body.password,
    );

    session.userId = user.id;

    return user;
  }

  @Post('/login')
  async login(@Body() body: LoginUserDto, @Session() session: any) {
    const user = await this.authService.login(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  // route logout dan mengubah userId menjadi null
  @Post('/logout')
  logout(@Session() session: any) {
    session.userId = null;
  }

  // route melihat data user yang sedang login dan register
  @Get('/whoami')
  async whoAmI(@Session() session: any) {
    const user = await this.usersService.findOne(session.userId);
    return user;
  }
}
