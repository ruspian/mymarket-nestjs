import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { setupApp } from '../src/setup-app';

describe('Auth Controller (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    // setupApp(app);
    await app.init();
  });

  it('handle register', () => {
    return request(app.getHttpServer())
      .post('/auth/register')
      .send({
        name: 'name',
        email: 'email4@email.com',
        password: 'password2',
      })
      .expect(201)
      .then(({ body }: request.Response) => {
        expect(body.id).toBeDefined();
        expect(body.name).toBe('name');
        expect(body.email).toBe('email4@email.com');
      });
  });
});
