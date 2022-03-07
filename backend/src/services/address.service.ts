import { CreateAddressDto } from '@dtos/address.dto';
import { HttpException } from '@exceptions/HttpException';
import { Address } from '@interfaces/address.interface';
import addressModel from '@models/address.model';
import { isEmpty } from '@utils/util';

class AddressService {
  public address = addressModel;

  public async getAddressByAddressId(addressId: string): Promise<Address> {
    if (isEmpty(addressId)) throw new HttpException(400, 'AddressId is empty');

    const findAddress: Address = await this.address.findOne({ _id: addressId });
    if (!findAddress) throw new HttpException(404, 'Address not found');

    return findAddress;
  }

  public async createAddress(addressData: CreateAddressDto): Promise<Address> {
    if (isEmpty(addressData)) throw new HttpException(400, 'AddressData is empty');

    const findAddress: Address = await this.address.findOne({ address: addressData.address });
    const findCity: Address = await this.address.findOne({ city: addressData.city });
    if (findAddress && findCity) throw new HttpException(409, 'Your Address still exists');

    const createAddressData: Address = await this.address.create({ ...addressData });

    return createAddressData;
  }

  public async deleteAddress(addressId: string): Promise<Address> {
    const deleteAddressById: Address = await this.address.findByIdAndDelete(addressId);
    if (!deleteAddressById) throw new HttpException(409, 'Deletion was not possible');

    return deleteAddressById;
  }
}

export default AddressService;
