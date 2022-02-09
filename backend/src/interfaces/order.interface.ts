export interface Order {
    _id: string;
    customerId: string;
    products: string[];
    date: Date;
    totalPrice: number;
}