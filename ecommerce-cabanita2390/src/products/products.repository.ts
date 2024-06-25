import { Injectable } from '@nestjs/common';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: boolean;
  imgUrl: string;
}

export interface ProductModificate {
  id?: string;
  name?: string;
  description?: string;
  price?: number;
  stock?: boolean;
  imgUrl?: string;
}

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
  async getProducts(page: number, limit: number) {
    if (!page) page = 1;
    if (!limit) limit = 5;

    const start = (page - 1) * limit;
    const end = start + limit;

    const producToRenderize = products.slice(start, end);

    return producToRenderize;
  }

  async getProductByID(id: string) {
    const product = await products.find((product) => product.id === id);

    if (!product) return 'Producto no encontrado';
    return product;
  }

  async createProduct(product: Product) {
    products.push(product);

    const productId = product.id;
    return productId;
  }

  async updateProduct(dataProduct: ProductModificate, id: string) {
    //Buscamos el producto
    const productFound = products.find((product) => product.id === id);

    // Si no existe retornamos
    if (!productFound) return 'Producto no encontrado';

    //Si el producto existe, actualizamos la info
    if (dataProduct.name) productFound.name = dataProduct.name;
    if (dataProduct.description)
      productFound.description = dataProduct.description;
    if (dataProduct.price) productFound.price = dataProduct.price;
    if (dataProduct.stock) productFound.stock = dataProduct.stock;
    if (dataProduct.imgUrl) productFound.imgUrl = dataProduct.imgUrl;

    return productFound.id;
  }

  async deleteProdut(id: string) {
    const productIndexFound = products.findIndex(
      (product) => product.id === id,
    );
    if (productIndexFound === -1) return 'Usuario no encontrado';

    products.splice(productIndexFound, 1);

    return id;
  }
}
