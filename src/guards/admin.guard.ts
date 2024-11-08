import { CanActivate, ExecutionContext } from '@nestjs/common';

export class AdminGuard implements CanActivate {
  canActivate(ctx: ExecutionContext) {
    const request = ctx.switchToHttp().getRequest();

    // cek apakah admin
    if (!request.currentUser) {
      return false;
    }

    // jika admin, lanjutkan
    return request.currentUser.admin;
  }
}
