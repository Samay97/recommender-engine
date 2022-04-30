import { Request } from 'express';
import { User } from '@interfaces/users.interface';
import { Customer } from './customers.interface';

export interface DataStoredInToken {
  _id: string;
}

export interface TokenData {
  token: string;
  expiresIn: number;
}

export interface RequestWithUser extends Request {
  user: Customer;
}
