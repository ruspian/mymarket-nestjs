import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createItemDto } from './dtos/create-item.dto';
import { Item } from './item.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item) private itemsRepository: Repository<Item>,
  ) {}

  create(body: createItemDto) {
    const newItem = this.itemsRepository.create(body);
    return this.itemsRepository.save(newItem);
  }
}
