import { Message, Response } from './';

export interface Customer {
    _id: string;
    Firstname: string;
    Lastname: string;
    Gender: string;
    Email: string;
    Birthday: string;
    AddressID: string;
}

export interface CustomerResponse extends Response<Customer> {
    message: Message.LOGIN;
}
