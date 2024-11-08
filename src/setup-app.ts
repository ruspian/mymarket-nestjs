import { ValidationPipe } from '@nestjs/common';
import cookieSession = require('cookie-session');

export const setupApp = (app: any) => {
  // cookie session
  app.use(
    cookieSession({
      keys: ['qwertyuiop'],
    }),
  );

  // validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
};
