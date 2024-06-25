import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product, ProductModificate } from './products.repository';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getProducts(@Query('page') page: string, @Query('limit') limit: string) {
    return this.productsService.getProducts(page, limit);
  }

  @Get('/:id')
  getProductById(@Param('id') id: string) {
    const product = this.productsService.getProductByID(id);
    return product;
  }

  @Post()
  createProduct(@Body() product: Product) {
    if (
      !product.id ||
      !product.name ||
      !product.description ||
      !product.price ||
      !product.stock ||
      !product.imgUrl
    )
      return 'Datos incompletos';
    const newProduct = this.productsService.createProduct(product);
    return newProduct;
  }

  @Put('/:id')
  updateProduct(
    @Body() dataProduct: ProductModificate,
    @Param('id') id: string,
  ) {
    const updatedProduct = this.productsService.updateProduct(dataProduct, id);
    return updatedProduct;
  }

  @Delete('/:id')
  deleteProdut(@Param('id') id: string) {
    const deletedProdut = this.productsService.deleteProdut(id);
    return deletedProdut;
  }
}
