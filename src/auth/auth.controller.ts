import {
  Body,
  Controller,
  Get,
  Post,
  Session,
  UseInterceptors,
} from '@nestjs/common';
import { LoginUserDto } from '../auth/dtos/login-user.dto';
import { createUserDto } from '../users/dtos/create-user.dto';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserDto } from '../users/dtos/user.dto';
import { CurrentUser } from './decorators/current-user.decorator';
import { CurrentUserInterceptor } from '../auth/interceptors/current-user.interceptor';
import { User } from '../users/user.entity';

@Controller('auth')
@Serialize(UserDto)
@UseInterceptors(CurrentUserInterceptor)
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
  async whoAmI(@CurrentUser() user: User) {
    return user;
  }
}
