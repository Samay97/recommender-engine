import { Message, Response } from './';

export interface Category {
    _id: string;
    name: string;
    logo: string;
}

export interface CategoriesResponse extends Response<Category[]> {
    message: Message.FIND_MANY;
}
