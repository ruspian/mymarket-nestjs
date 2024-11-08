import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createItemDto } from './dtos/create-item.dto';
import { Item } from './item.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/user.entity';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item) private itemsRepository: Repository<Item>,
  ) {}

  create(item: createItemDto, user: User) {
    const newItem = this.itemsRepository.create(item);
    newItem.user = user;
    return this.itemsRepository.save(newItem);
  }
}
