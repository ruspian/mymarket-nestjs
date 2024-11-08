import { Expose, Transform } from 'class-transformer';

export class ItemDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  price: number;

  @Expose()
  location: string;

  @Expose()
  category: string;

  // memastikan id user didapatkan dari id user yang ada di item
  @Transform(({ obj }) => obj.user.id)
  @Expose()
  userId: number;
}
