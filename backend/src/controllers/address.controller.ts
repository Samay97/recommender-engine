import { NextFunction, Request, Response } from 'express';
import { CreateAddressDto } from '@dtos/address.dto';
import { Address } from '@interfaces/address.interface';
import addressService from '@services/address.service';

class AddressController {
  public addressService = new addressService();

  public getAddressByAddressId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const addressId: string = req.params.id;
      const findOneAddress: Address = await this.addressService.getAddressByAddressId(addressId);

      res.status(200).json({ data: findOneAddress, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createAddress = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const addressData: CreateAddressDto = req.body;
      const createAddressData: Address = await this.addressService.createAddress(addressData);

      res.status(201).json({ data: createAddressData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public deleteAddress = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const addressId: string = req.params.id;
      const deleteAddressData: Address = await this.addressService.deleteAddress(addressId);

      res.status(200).json({ data: deleteAddressData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default AddressController;
