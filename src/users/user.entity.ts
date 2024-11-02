import {
  AfterInsert,
  AfterUpdate,
  AfterRemove,
  Entity,
  PrimaryGeneratedColumn,
  Column,
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
  password: string;

  @AfterInsert()
  logInsert() {
    console.log('User Berhasil Ditambahkan Dengan Id: ' + this.id);
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
