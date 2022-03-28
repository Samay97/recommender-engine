import { Message } from './';

export interface Response<T> {
    data: T;
    message: Message;
}
