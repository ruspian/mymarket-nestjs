import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { User } from 'src/users/user.entity';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    // membuat fake user service untuk testing
    const fakeUsersService: Partial<UsersService> = {
      findAll: () => Promise.resolve([]),
      create: (name: string, email: string, password: string) => {
        return Promise.resolve({ id: 1, name, email, password } as User);
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // membuat test untuk register
  it('should create an user', async () => {
    const user = await service.register(
      'name1',
      'email@email.com',
      'password1',
    );

    // memastikan password sudah di hash
    expect(user.password).not.toEqual('password');

    const [salt, hash] = user.password.split('.');

    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });
});
