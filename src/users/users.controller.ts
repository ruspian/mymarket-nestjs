import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Session,
} from '@nestjs/common';
import { createUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dtos/login-user.dto';

@Controller('users')
@Serialize(UserDto)
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  // set data ke session cookie
  // @Get('/pet/:pet')
  // setPet(@Param('pet') pet: string, @Session() session: any) {
  //   session.pet = pet;
  // }

  // mengambil data dari session cookie
  // @Get('/pet')
  // getPet(@Session() session: any) {
  //   return session.pet;
  // }

  @Get()
  findAllUsers(@Query('email') email: string) {
    return this.usersService.findAll(email);
  }

  @Post()
  createUser(@Body() body: createUserDto) {
    this.usersService.create(body.name, body.email, body.password);
  }

  @Get('/:id')
  findUser(@Param('id') id: string) {
    return this.usersService.findOne(parseInt(id));
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.usersService.remove(parseInt(id));
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(parseInt(id), body);
  }

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
  @Get('auth/whoami')
  async whoAmI(@Session() session: any) {
    const user = await this.usersService.findOne(session.userId);
    return user;
  }
}
