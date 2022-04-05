import { Router } from 'express';
import ShoppingCartController from '@controllers/shoppingCart.controller';
import { CreateShoppingCartDto } from '@dtos/shopping_carts.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import authMiddleware from '@/middlewares/auth.middleware';

class ShoppingCartRoute implements Routes {
  public path = '/shoppingcart';
  public router = Router();
  public shoppingcartController = new ShoppingCartController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware, this.shoppingcartController.getShoppingCartByCustomerId);
    this.router.post(`${this.path}`, authMiddleware, this.shoppingcartController.createShoppingCart);
    this.router.put(
      `${this.path}`,
      [authMiddleware, validationMiddleware(CreateShoppingCartDto, 'body', true)],
      this.shoppingcartController.updateShoppingCart,
    );
  }
}

export default ShoppingCartRoute;
