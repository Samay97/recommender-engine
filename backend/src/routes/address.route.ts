import { Router } from 'express';
import AddressController from '@controllers/address.controller';
import { CreateAddressDto } from '@dtos/address.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class AddressRoute implements Routes {
  public path = '/address';
  public router = Router();
  public addressController = new AddressController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/:id`, this.addressController.getAddressByAddressId);
    this.router.post(`${this.path}`, validationMiddleware(CreateAddressDto, 'body'), this.addressController.createAddress);
    this.router.delete(`${this.path}/:id`, this.addressController.deleteAddress);
  }
}

export default AddressRoute;
