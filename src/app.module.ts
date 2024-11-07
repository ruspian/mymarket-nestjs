import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ItemsModule } from './items/items.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Item } from './items/item.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    // konesi database
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [User, Item],
      // synchronize: hanya untuk development tidak untuk production pada saat production ubah synchronize menjadi false atau matikan synchronize
      synchronize: true,
    }),
    UsersModule,
    ItemsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
