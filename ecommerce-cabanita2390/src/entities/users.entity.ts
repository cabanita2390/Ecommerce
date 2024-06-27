import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Orders } from './orders.entity';

@Entity({
  name: 'USERS',
})
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 50, unique: true, nullable: false })
  email: string;

  @Column({ type: 'varchar', length: 20, nullable: false })
  password?: string;

  @Column({ type: 'bigint' })
  phone: number;

  @Column({ type: 'varchar', length: 50 })
  country: string;

  @Column({ type: 'text' })
  address: string;

  @Column({ length: 50 })
  city: string;

  //Acá va la relación:
  //orders_id: Relación 1:N con orders
  @OneToMany(() => Orders, (order) => order.user)
  orders: Orders[];
}
