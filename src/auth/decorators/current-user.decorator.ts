import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: never, ctx: ExecutionContext) => {
    // mendapatkan data dari request
    const request = ctx.switchToHttp().getRequest();
    console.log(request.session.userId);
  },
);
