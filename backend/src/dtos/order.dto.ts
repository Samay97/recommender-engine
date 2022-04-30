import { Product } from '@/interfaces/products.interface';
import { IsArray, ArrayMinSize } from 'class-validator';

export class CreateOrderDto {
  @IsArray()
  @ArrayMinSize(1)
  public products: Array<string>;
}

export class CreateOrder {
  public products: Array<Product>;
  public customerId: string;
  public date: Date;
  public totalPrice: number;
}
