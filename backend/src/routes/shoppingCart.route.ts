import { Router } from 'express';
import ShoppingCartController from '@controllers/shoppingCart.controller';
import { CreateShoppingCartDto } from '@dtos/shopping_carts.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class ShoppingCartRoute implements Routes {
  public path = '/shoppingCart';
  public router = Router();
  public shoppingcartController = new ShoppingCartController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/:id`, this.shoppingcartController.getShoppingCartByCustomerId);
    this.router.post(`${this.path}`, validationMiddleware(CreateShoppingCartDto, 'body'), this.shoppingcartController.createShoppingCart);
    this.router.put(`${this.path}/:id`, validationMiddleware(CreateShoppingCartDto, 'body', true), this.shoppingcartController.updateShoppingCart);
  }
}

export default ShoppingCartRoute;
