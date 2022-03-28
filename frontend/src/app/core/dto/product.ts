import { Message, Response } from './';

export interface Product {
    _id: string; // UUID-4
    name: string;
    description: string;
    images: string[];
    mainImage: string;
    price: number;
    rating: number;
    ratingsTotal: number;
    bestSeller: boolean;
    category: string; // UUID-4
}

export interface ProductResponse extends Response<Product> {
    message: Message.FIND_ONE;
}

export interface ProductsResponse extends Response<Product[]> {
    message: Message.FIND_MANY;
}
