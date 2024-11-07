import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { createUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from './user.entity';

@Controller('users')
@Serialize(UserDto)
export class UsersController {
  constructor(private usersService: UsersService) {}

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

  @Get('/auth/current-user')
  currentUser(@CurrentUser() user: User) {
    return user;
  }
}
