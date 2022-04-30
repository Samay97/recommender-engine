import { HttpException } from '@exceptions/HttpException';
import { Order } from '@interfaces/order.interface';
import orderModel from '@models/order.model';
import { isEmpty } from '@utils/util';
import { CreateOrder } from '@/dtos/order.dto';

class OrderService {
  public orders = orderModel;

  public async findAllOrders(): Promise<Order[]> {
    const orders: Order[] = await this.orders.find();
    return orders;
  }

  public async findOrdersByCustomerId(customerId: string): Promise<Order[]> {
    if (isEmpty(customerId)) throw new HttpException(400, 'No customer id');

    const findOrder: Order[] = await this.orders.find({ customerId: customerId });
    if (!findOrder) throw new HttpException(404, 'Order not found');

    return findOrder;
  }

  public async createOrder(orderData: CreateOrder): Promise<Order> {
    if (isEmpty(orderData)) throw new HttpException(400, 'OrderData is empty');

    const createOrderData: Order = await this.orders.create({ ...orderData });

    return createOrderData;
  }

  public async deleteOrder(orderId: string): Promise<Order> {
    const deleteOrderById: Order = await this.orders.findByIdAndDelete(orderId);
    if (!orderId) throw new HttpException(409, 'Deletion not possible');

    return deleteOrderById;
  }
}

export default OrderService;
