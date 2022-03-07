import { CreateCustomerDto } from '@/dtos/customers.dto';
import { HttpException } from '@exceptions/HttpException';
import { Customer } from '@interfaces/customers.interface';
import customerModel from '@models/customers.model';
import { isEmpty } from '@utils/util';

class CustomerService {
  public customers = customerModel;

  public async findAllCustomers(): Promise<Customer[]> {
    const customers: Customer[] = await this.customers.find();
    return customers;
  }

  public async findCustomerByCustomerId(customerId: string): Promise<Customer> {
    if (isEmpty(customerId)) throw new HttpException(400, 'CustomerId is empty');

    const findCustomer: Customer = await this.customers.findOne({ _id: customerId });
    if (!findCustomer) throw new HttpException(404, 'Customer not found');

    return findCustomer;
  }

  public async findCustomersByAddressId(addressId: string): Promise<Customer[]> {
    if (isEmpty(addressId)) throw new HttpException(400, 'AddressId is empty');

    const customers: Customer[] = await this.customers.find({ _id: addressId });
    if (!customers) throw new HttpException(404, 'Customer not found');

    return customers;
  }

  public async createCustomer(customerData: CreateCustomerDto): Promise<Customer> {
    if (isEmpty(customerData)) throw new HttpException(400, 'CustomerData is empty');

    const findCustomer: Customer = await this.customers.findOne({ email: customerData.email });
    if (findCustomer) throw new HttpException(409, 'Customer still exists');

    const createUserData: Customer = await this.customers.create({ ...customerData });

    return createUserData;
  }

  public async deleteCustomer(customerId: string): Promise<Customer> {
    const deleteCustomerById: Customer = await this.customers.findByIdAndDelete(customerId);
    if (!deleteCustomerById) throw new HttpException(409, 'Deletion not possible');

    return deleteCustomerById;
  }
}

export default CustomerService;
