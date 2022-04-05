import { Response, Message } from './';

export interface Card {
    products: string[];
    customerId: string;
}

export interface CardResponse extends Response<Card> {
    message: Message.FIND_ONE;
}
