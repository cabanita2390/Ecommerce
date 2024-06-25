import { Injectable } from '@nestjs/common';

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: boolean;
  imgUrl: string;
};

const products: Product[] = [
  {
    id: 'p001',
    name: 'Smartphone X1',
    description: 'A powerful smartphone with 6GB RAM and 128GB storage.',
    price: 699.99,
    stock: true,
    imgUrl: 'https://example.com/images/smartphone-x1.jpg',
  },
  {
    id: 'p002',
    name: 'Wireless Headphones',
    description:
      'Noise-cancelling over-ear headphones with 20 hours of battery life.',
    price: 199.99,
    stock: true,
    imgUrl: 'https://example.com/images/wireless-headphones.jpg',
  },
  {
    id: 'p003',
    name: 'Gaming Laptop',
    description: 'High-performance gaming laptop with 16GB RAM and 512GB SSD.',
    price: 1499.99,
    stock: false,
    imgUrl: 'https://example.com/images/gaming-laptop.jpg',
  },
  {
    id: 'p004',
    name: '4K Monitor',
    description: '27-inch 4K monitor with HDR support and 144Hz refresh rate.',
    price: 499.99,
    stock: true,
    imgUrl: 'https://example.com/images/4k-monitor.jpg',
  },
];

@Injectable()
export class ProductsRepository {
  async getProducts(): Promise<Product[]> {
    return await products;
  }
}
