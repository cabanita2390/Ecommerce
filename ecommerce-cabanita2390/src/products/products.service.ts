import { Injectable } from '@nestjs/common';
import {
  // Product,
  // ProductModificate,
  ProductsRepository,
} from './products.repository';
import { UpdateProductDto } from './products.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  addProducts() {
    return this.productsRepository.addProducts();
  }

  getProducts(page: string, limit: string) {
    const pageNumber = Number(page);
    const limitNumber = Number(limit);

    const products = this.productsRepository.getProducts(
      pageNumber,
      limitNumber,
    );
    return products;
  }

  getProductByID(id: string) {
    const product = this.productsRepository.getProductByID(id);

    return product;
  }

  /*
  createProduct(product: Product) {
    const newProduct = this.productsRepository.createProduct(product);
    return newProduct;
  }
*/
  updateProduct(dataProduct: UpdateProductDto, id: string) {
    const updatedProduct = this.productsRepository.updateProduct(
      dataProduct,
      id,
    );
    return updatedProduct;
  }

  // deleteProdut(id: string) {
  //   const deletedProdut = this.productsRepository.deleteProdut(id);
  //   return deletedProdut;
  // }
}
