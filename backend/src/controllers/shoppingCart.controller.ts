import { NextFunction, Response } from 'express';
import { RequestWithUser } from '@interfaces/auth.interface';
import { CreateShoppingCartDto } from '@dtos/shopping_carts.dto';
import { ShoppingCart } from '@interfaces/shoppingCarts.interface';
import shoppingCartService from '@services/shoppingCart.service';
import { Customer } from '@/interfaces/customers.interface';

class ShoppingCartController {
  public shoppingCartService = new shoppingCartService();

  public getShoppingCartByCustomerId = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userData: Customer = req.user;
      const findOneShoppingCartData: ShoppingCart = await this.shoppingCartService.findShoppingCartByCustomerId(userData._id);

      res.status(200).json({ data: findOneShoppingCartData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createShoppingCart = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userData: Customer = req.user;
      const shoppingCartData: CreateShoppingCartDto = { customerId: userData._id, products: [] };
      const createShoppingCartData: ShoppingCart = await this.shoppingCartService.createShoppingCart(shoppingCartData);

      res.status(201).json({ data: createShoppingCartData, message: 'Shopping Cart created' });
    } catch (error) {
      next(error);
    }
  };

  public updateShoppingCart = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const customerId: string = req.user._id;
      const shoppingCartData: CreateShoppingCartDto = { ...req.body, customerId: customerId };
      const updateShoppingCartData: ShoppingCart = await this.shoppingCartService.updateShoppingCart(customerId, shoppingCartData);

      res.status(200).json({ data: updateShoppingCartData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };
}

export default ShoppingCartController;
