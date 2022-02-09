import { NextFunction, Request, Response } from 'express';
import { CreateCustomerDto } from '@dtos/customers.dto';
import { Customer } from '@interfaces/customers.interface';
import customerService from '@services/customers.service';

class CustomerController {
  public customerService = new customerService();

  public getCustomers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllCustomersData: Customer[] = await this.customerService.findAllCustomers();

      res.status(200).json({ data: findAllCustomersData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getCustomerByCustomerId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const customerId: string = req.params.id;
      const findOneCustomerData: Customer = await this.customerService.findCustomerByCustomerId(customerId);

      res.status(200).json({ data: findOneCustomerData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public getCustomersByAddressId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const addressId: string = req.params.addressID;
      const findAllCustomersData: Customer[] = await this.customerService.findCustomersByAddressId(addressId);

      res.status(200).json({ data: findAllCustomersData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public createCustomer = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const customerData: CreateCustomerDto = req.body;
      const createCustomerData: Customer = await this.customerService.createCustomer(customerData);

      res.status(201).json({ data: createCustomerData, message: 'Customer created' });
    } catch (error) {
      next(error);
    }
  };

  public deleteCustomerById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const customerId: string = req.params.id;
      const deleteCustomerData: Customer = await this.customerService.deleteCustomer(customerId);

      res.status(200).json({ data: deleteCustomerData, message: 'Customer deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default CustomerController;
