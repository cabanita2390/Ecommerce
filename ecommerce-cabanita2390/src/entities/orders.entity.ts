import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Users } from './users.entity';
import { OrderDetails } from './orderDetails.entity';

@Entity({
  name: 'ORDERS',
})
export class Orders {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  date: Date;

  // Relación 1:N con users
  @ManyToOne(() => Users, (user) => user.orders)
  @JoinColumn({ name: 'user_id' })
  user: Users;

  // Relación 1:1 con orderDetails
  @OneToOne(() => OrderDetails, (orderDetail) => orderDetail.orders)
  @JoinColumn({ name: 'orderDetails_id' }) // Asegúrate de que el nombre de la columna es correcto
  orderDetails: OrderDetails;
}
