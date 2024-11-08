import { Body, Controller, Post } from '@nestjs/common';
import { createItemDto } from './dtos/create-item.dto';

@Controller('items')
export class ItemsController {
  @Post()
  createItem(@Body() body: createItemDto) {
    return 'ini adalah aksi menambahkan item baru';
  }
}
