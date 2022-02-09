import { IsString, IsArray } from 'class-validator';

export class CreateShoppingCartDto {
  @IsString()
  public customerId: string;

  @IsArray()
  public products: Array<string>;
}
