import { Exclude } from 'class-transformer';
import { Item } from '../items/item.entity';
import {
  AfterInsert,
  AfterUpdate,
  AfterRemove,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ default: true })
  admin: boolean;

  @OneToMany(() => Item, (item) => item.user)
  items: Item[];

  @AfterInsert()
  logInsert() {
    // console.log('User Berhasil Ditambahkan Dengan Id: ' + this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('User Dengan Id: ' + this.id + ' Berhasil Diupdate');
  }

  @AfterRemove()
  logRemove() {
    console.log('User Dengan Id: ' + this.id + ' Berhasil Dihapus');
  }
}
