import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Injectable,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private usersService: UsersService) {}

  async intercept(ctx: ExecutionContext, next: CallHandler) {
    // mendapatkan data dari request
    const request = ctx.switchToHttp().getRequest();
    const { userId } = request.session || {};

    // cek apakah ada user dengan id yang di request
    if (userId) {
      const user = await this.usersService.findOne(userId);
      request.currentUser = user;
    }
    // jika user ada atau tidak, tetap melanjutkan
    return next.handle();
  }
}
