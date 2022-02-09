import { IsNumber, IsArray, IsString, IsDate } from 'class-validator';

export class CreateOrderDto {
    @IsString()
    public customerId: string;

    @IsArray()
    public products: Array<string>;

    @IsDate()
    public date: Date

    @IsNumber()
    public totalPrice: number;
}
