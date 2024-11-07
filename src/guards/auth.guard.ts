import {
  CanActivate,
  ExecutionContext,
  NotFoundException,
} from '@nestjs/common';
import { throwIfEmpty } from 'rxjs';

export class AuthGuard implements CanActivate {
  canActivate(ctx: ExecutionContext) {
    const request = ctx.switchToHttp().getRequest();

    if (!request.session.userId) {
      throw new NotFoundException('Anda Harus Login Terlebih Dahulu!');
    }

    return request.session.userId;
  }
}
