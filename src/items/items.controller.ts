import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { createItemDto } from './dtos/create-item.dto';
import { ItemsService } from './items.service';
import { AuthGuard } from '../guards/auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from '../users/user.entity';
import { Serialize } from '../interceptors/serialize.interceptor';
import { ItemDto } from './dtos/item.dto';
import { ApproveItemDto } from './dtos/approve-item.dto';
import { AdminGuard } from '../guards/admin.guard';

@Controller('items')
export class ItemsController {
  constructor(private itemsService: ItemsService) {}

  @Post()
  @UseGuards(AuthGuard)
  @Serialize(ItemDto)
  createItem(@Body() body: createItemDto, @CurrentUser() user: User) {
    return this.itemsService.create(body, user);
  }

  @Patch(':id')
  @UseGuards(AdminGuard)
  approveItem(@Param('id') id: string, @Body() body: ApproveItemDto) {
    return this.itemsService.approveItem(parseInt(id), body.approved);
  }
}
