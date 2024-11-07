import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { User } from '../users/user.entity';

describe('AuthController', () => {
  let controller: AuthController;

  let fakeUsersService: Partial<UsersService>;
  let fakeAuthService: Partial<AuthService>;

  beforeEach(async () => {
    fakeUsersService = {};
    fakeAuthService = {
      login: (email: string, password: string) => {
        return Promise.resolve({ id: 1, email, password } as User);
      },
    };

    // menyiapkan mock module
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
        {
          provide: AuthService,
          useValue: fakeAuthService,
        },
      ],
      controllers: [AuthController],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // tes untuk user login
  it('should user login', async () => {
    const session = {
      userId: 10,
    };

    const user = await controller.login(
      { email: 'email@email.com', password: 'emailpass' },
      session,
    );

    expect(user).toEqual({
      id: 1,
      email: 'email@email.com',
      password: 'emailpass',
    });

    expect(session.userId).toEqual(1);
  });
});
