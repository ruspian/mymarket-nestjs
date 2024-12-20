import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createItemDto } from './dtos/create-item.dto';
import { Item } from './item.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/user.entity';
import { QueryItemDto } from './dtos/query-item.dto';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item) private itemsRepository: Repository<Item>,
  ) {}

  async getAllItems(queryItemDto: QueryItemDto) {
    const query = await this.itemsRepository
      .createQueryBuilder()
      .select('*')
      .where('approved LIKE :approved', { approved: true });

    if (queryItemDto.name) {
      query.andWhere('name LIKE :name', { name: `%${queryItemDto.name}%` });
    }

    if (queryItemDto.location) {
      query.andWhere('location LIKE :location', {
        location: `%${queryItemDto.location}%`,
      });
    }

    if (queryItemDto.category) {
      query.andWhere('category LIKE :category', {
        category: `%${queryItemDto.category}%`,
      });
    }
    query.getRawMany();
  }

  create(item: createItemDto, user: User) {
    const newItem = this.itemsRepository.create(item);
    newItem.user = user;
    return this.itemsRepository.save(newItem);
  }

  async approveItem(id: number, approved: boolean) {
    const item = await this.itemsRepository.findOneBy({ id });

    if (!item) {
      throw new NotFoundException('Item tidak ditemukan!');
    }

    item.approved = approved;
    return this.itemsRepository.save(item);
  }
}
