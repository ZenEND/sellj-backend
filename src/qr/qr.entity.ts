import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class QrEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  info?: string;
}
