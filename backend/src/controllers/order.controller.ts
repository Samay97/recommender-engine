import { NextFunction, Request, Response } from 'express';
import { CreateOrderDto, CreateOrder } from '@dtos/order.dto';
import { Order } from '@interfaces/order.interface';
import OrderService from '@services/order.service';
import { RequestWithUser } from '@interfaces/auth.interface';
import ProductService from '@/services/products.service';
import { Product } from '@/interfaces/products.interface';

class OrderController {
  public orderService = new OrderService();
  public productService = new ProductService();

  public getAllOrders = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllOrders: Order[] = await this.orderService.findAllOrders();

      res.status(200).json({ data: findAllOrders, message: 'findAllOrders' });
    } catch (error) {
      next(error);
    }
  };

  public getOrdersByCustomerId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const customerId: string = req.params.id;
      const findAllOrders: Order[] = await this.orderService.findOrdersByCustomerId(customerId);

      res.status(200).json({ data: findAllOrders, message: 'findAllOrdersByCustomerId' });
    } catch (error) {
      next(error);
    }
  };

  public createOrder = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const _orderData: CreateOrderDto = req.body;

      const promises = [];
      _orderData.products.forEach((product: string) => {
          promises.push(this.productService.findProductById(product))
      });

      const products = await Promise.all(promises);      

      const orderData: CreateOrder  = {
        customerId: req.user._id,
        products: [...products],
        date: new Date(),
        totalPrice: products.reduce((pv: number, cv:Product) => pv + cv.price, 0)
      };
      const createProductData: Order = await this.orderService.createOrder(orderData);

      res.status(201).json({ data: createProductData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public deleteOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const orderId: string = req.params.id;
      const deleteOrderData: Order = await this.orderService.deleteOrder(orderId);

      res.status(200).json({ data: deleteOrderData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default OrderController;
