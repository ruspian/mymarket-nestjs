import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { User } from 'src/users/user.entity';

describe('AuthService', () => {
  let service: AuthService;
  let fakeUsersService: Partial<UsersService>;

  beforeEach(async () => {
    // membuat fake user service untuk testing
    fakeUsersService = {
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

    // memastikan name sudah di set
    expect(user.name).toBe('name1');

    // memastikan password sudah di hash
    expect(user.password).not.toEqual('password');

    const [salt, hash] = user.password.split('.');

    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it('should fail to create an user with an existing email', async () => {
    fakeUsersService.findAll = () => {
      return Promise.resolve([
        {
          id: 1,
          name: 'name1',
          email: 'email@email.com',
          password: 'password1',
        } as User,
      ]);
    };
    await expect(
      service.register('name1', 'email@email.com', 'password1'),
    ).rejects.toThrow('Email sudah digunakan!');
  });
});
