import { Router } from 'express';
import CustomerController from '@controllers/customers.controllers';
import { CreateCustomerDto } from '@dtos/customers.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class CustomersRoute implements Routes {
  public path = '/customers';
  public router = Router();
  public customersController = new CustomerController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.customersController.getCustomers);
    this.router.get(`${this.path}/:id`, this.customersController.getCustomerByCustomerId);
    this.router.get(`${this.path}/:id`, this.customersController.getCustomersByAddressId);
    this.router.post(`${this.path}`, validationMiddleware(CreateCustomerDto, 'body'), this.customersController.createCustomer);
    this.router.delete(`${this.path}/:id`, this.customersController.deleteCustomerById);
  }
}

export default CustomersRoute;
