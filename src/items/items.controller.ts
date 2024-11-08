import { Body, Controller, Post } from '@nestjs/common';
import { createItemDto } from './dtos/create-item.dto';
import { ItemsService } from './items.service';

@Controller('items')
export class ItemsController {
  constructor(private itemsService: ItemsService) {}

  @Post()
  createItem(@Body() body: createItemDto) {
    return this.itemsService.create(body);
  }
}
