import { Router } from 'express';
import OrderController from '@controllers/order.controller';
import { CreateOrderDto } from '@dtos/order.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class OrderRoute implements Routes {
  public path = '/order';
  public router = Router();
  public orderController = new OrderController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.orderController.getAllOrders);
    this.router.get(`${this.path}/:id`, this.orderController.getOrdersByCustomerId);
    this.router.post(`${this.path}`, validationMiddleware(CreateOrderDto, 'body'), this.orderController.createOrder);
    this.router.delete(`${this.path}/:id`, this.orderController.deleteOrder);
  }
}

export default OrderRoute;
