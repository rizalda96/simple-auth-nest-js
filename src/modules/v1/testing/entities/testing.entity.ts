
import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, Index } from 'typeorm';

@Entity()
export class Testing {
  @Index()
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'first_name',
    type: 'varchar',
    nullable: true,
  })
  firstName: string;

  @Column({
    name: 'last_name',
    type: 'varchar',
    nullable: true,
  })
  lastName: string;

  @Column({ default: true, name: 'is_active' })
  isActive: boolean;

  @Index()
  @CreateDateColumn()
  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn()
  @Column({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}