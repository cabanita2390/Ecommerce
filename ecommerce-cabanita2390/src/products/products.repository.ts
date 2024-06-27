import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categories } from 'src/entities/categories.entity';
import { Products } from 'src/entities/products.entity';
import { Repository } from 'typeorm';
import * as data from '../utils/data.json';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(Products)
    private readonly productsRepository: Repository<Products>,
    @InjectRepository(Categories)
    private readonly categoriesRepository: Repository<Categories>,
  ) {}

  async getProducts(page: number, limit: number) {
    let products = await this.productsRepository.find({
      relations: {
        category: true,
      },
    });
    const start = (page - 1) * limit;
    const end = start + limit;
    products = products.slice(start, end);

    return products;
  }

  async getProductByID(id: string) {
    const product = await this.productsRepository.findOneBy({ id });

    if (!product) return 'Producto no encontrado';
    return product;
  }

  async addProducts() {
    //Verficiamos que exista la categoria
    const categories = await this.categoriesRepository.find();

    data?.map(async (element) => {
      const category = categories.find(
        (category) => category.name === element.category,
      );
      // Creamos nuevo Product y seteamos atributos:
      const product = new Products();
      product.name = element.name;
      product.description = element.description;
      product.price = element.price;
      product.stock = element.stock;
      product.imgUrl = element.imgUrl;
      product.category = category;

      //Grabamos el nuevo producto en la BBDD
      await this.productsRepository
        .createQueryBuilder()
        .insert()
        .into(Products)
        .values(product)
        .orUpdate(['description', 'price', 'imgUrl', 'stock', 'name']) //Si el producto ya existía, lo actualizamos
        .execute();
    });
    return 'Productos agregados';
  }
  async updateProduct(product: Products, id: string) {
    await this.productsRepository.update(id, product);

    const updatedProduct = await this.productsRepository.findOneBy({ id });

    return updatedProduct;
  }

  /*
  async createProduct(product: Product) {
    products.push(product);

    const productId = product.id;
    return productId;
  }


  async deleteProdut(id: string) {
    const productIndexFound = products.findIndex(
      (product) => product.id === id,
    );
    if (productIndexFound === -1) return 'Usuario no encontrado';

    products.splice(productIndexFound, 1);

    return id;
  }
    */
}
