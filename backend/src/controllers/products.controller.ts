import { NextFunction, Request, Response } from 'express';
import { CreateProductDto } from '@dtos/products.dto';
import { Product } from '@interfaces/products.interface';
import productService from '@services/products.service';


class ProductsController {
    public productService = new productService();


    public getProductById = async (req: Request, res: Response, next: NextFunction) => {
        try {
          const productId: string = req.params.id;
          const findOneProductData: Product = await this.productService.findProductById(productId);
    
          res.status(200).json({ data: findOneProductData, message: 'findOne' });
        } catch (error) {
          next(error);
        }
      };
  
    public getProducts = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const findAllProductsData: Product[] = await this.productService.findAllProducts();
  
        res.status(200).json({ data: findAllProductsData, message: 'findAll' });
      } catch (error) {
        next(error);
      }
    };


    public createProduct = async (req: Request, res: Response, next: NextFunction) => {
        try {
          const productData: CreateProductDto = req.body;
          const createProductData: Product = await this.productService.createProduct(productData);
    
          res.status(201).json({ data: createProductData, message: 'created' });
        } catch (error) {
          next(error);
        }
      };

      public deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
        try {
          const productId: string = req.params.id;
          const deleteProductData: Product = await this.productService.deleteProduct(productId);
    
          res.status(200).json({ data: deleteProductData, message: 'deleted' });
        } catch (error) {
          next(error);
        }
      };
}


export default ProductsController;