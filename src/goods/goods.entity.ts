import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('goods')
export class GoodsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description?: string;

  @Column()
  price: number;
}
