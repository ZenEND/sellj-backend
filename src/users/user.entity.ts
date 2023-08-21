import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { RolesEnum } from './interfaces/roles.enum';
import { Exclude } from 'class-transformer';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password!: string;

  @Column('enum', { enum: RolesEnum, array: true, default: [RolesEnum.User] })
  roles: RolesEnum[];
}
