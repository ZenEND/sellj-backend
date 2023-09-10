import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { StatusEnum } from './interfaces/status.enum';

@Entity('/orders')
export class OrdersEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  count: number;

  @Column({ type: 'enum', enum: StatusEnum })
  status: StatusEnum;
}
