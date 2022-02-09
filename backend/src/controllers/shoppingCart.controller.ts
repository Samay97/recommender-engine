import { NextFunction, Request, Response } from 'express';
import { CreateShoppingCartDto } from '@dtos/shopping_carts.dto';
import { ShoppingCart } from '@interfaces/shoppingCarts.interface';
import shoppingCartService from '@services/shoppingCart.service';

class ShoppingCartController {
  public shoppingCartService = new shoppingCartService();

  public getShoppingCartByCustomerId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const customerId: string = req.params.id;
      const findOneShoppingCartData: ShoppingCart = await this.shoppingCartService.findShoppingCartByCustomerId(customerId);

      res.status(200).json({ data: findOneShoppingCartData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createShoppingCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const shoppingCartData: CreateShoppingCartDto = req.body;
      const createShoppingCartData: ShoppingCart = await this.shoppingCartService.createShoppingCart(shoppingCartData);

      res.status(201).json({ data: createShoppingCartData, message: 'Shopping Cart created' });
    } catch (error) {
      next(error);
    }
  };

  public updateShoppingCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const customerId: string = req.params.id;
      const shoppingCartData: CreateShoppingCartDto = req.body;
      const updateShoppingCartData: ShoppingCart = await this.shoppingCartService.updateShoppingCart(customerId, shoppingCartData);

      res.status(200).json({ data: updateShoppingCartData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };
}

export default ShoppingCartController;
