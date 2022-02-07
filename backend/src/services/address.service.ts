import { CreateAddressDto } from '@dtos/address.dto';
import { HttpException } from '@exceptions/HttpException';
import { Address } from '@interfaces/address.interface';
import addressModel from '@models/address.model';
import { isEmpty } from '@utils/util';

class AddressService {
  public address = addressModel;

  public async getAddressByAddressId(addressId: string): Promise<Address> {
    if (isEmpty(addressId)) throw new HttpException(400, "")

    const findAddress: Address = await this.address.findOne({_id: addressId});
    if (!findAddress) throw new HttpException(404, "")

    return findAddress;
  }

  public async createAddress(addressData: CreateAddressDto): Promise<Address> {
    if (isEmpty(addressData)) throw new HttpException(400, "");

    const findAddress: Address = await this.address.findOne({ addressId: addressData.address });
    if (findAddress) throw new HttpException(409, "Your Address still exists");

    const createAddressData: Address = await this.address.create({ ...addressData });

    return createAddressData;
  }

  public async deleteAddress(addressId: string): Promise<Address> {
    const deleteAddressById: Address = await this.address.findByIdAndDelete(addressId);
    if (!deleteAddressById) throw new HttpException(409, "");

    return deleteAddressById;
  }
}

export default AddressService;