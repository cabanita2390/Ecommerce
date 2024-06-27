import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Products } from './products.entity';

@Entity({
  name: 'CATEGORIES',
})
export class Categories {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
  name: string;

  //Acá van las relaciones:

  // Relación 1:N con products
  @OneToMany(() => Products, (product) => product.category)
  products: Products[];
}
