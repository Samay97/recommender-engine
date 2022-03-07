import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Product, ProductResponse } from '../dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {}

  public getProduct(): Observable<Product> {
    return this.http.get<ProductResponse>('/api/products/620111b3d2da416cdc967d72').pipe(map((res: ProductResponse) => res.data));
  }
}
