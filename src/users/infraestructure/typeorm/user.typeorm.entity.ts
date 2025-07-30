import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class UserTypeOrmEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', length: 200, nullable: false, unique: true })
  name: string;

  @Column({ type: 'varchar', length: 150, nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 150, nullable: false })
  password: string;

  @CreateDateColumn({
    type: 'datetime',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'datetime',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    type: 'datetime',
  })
  deletedAt: Date;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;
}
