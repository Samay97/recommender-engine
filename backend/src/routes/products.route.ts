import { Router } from 'express';
import ProductsController from '@controllers/products.controller';
import { CreateProductDto } from '@dtos/products.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class ProductRoute implements Routes {
  public path = '/products';
  public router = Router();
  public productController = new ProductsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.productController.getProducts);
    this.router.get(`${this.path}/:id`, this.productController.getProductById);
    this.router.post(`${this.path}`, validationMiddleware(CreateProductDto, 'body'), this.productController.createProduct);
    /// this.router.put(`${this.path}/:id`, validationMiddleware(CreateUserDto, 'body', true), this.productController.updateProduct);
    this.router.delete(`${this.path}/:id`, this.productController.deleteProduct);
  }
}

export default ProductRoute;
