import { NextFunction, Request, Response } from 'express';
import { CreateOrderDto } from '@dtos/order.dto';
import { Order } from '@interfaces/order.interface';
import orderService from '@services/order.service';

class OrderController {
  public orderService = new orderService();

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

  public createOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const orderData: CreateOrderDto = req.body;
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
