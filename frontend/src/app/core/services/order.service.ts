import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { APP_CONFIG } from '../config';
import { CategorieResponse, Category, Product } from '../dto';

@Injectable({
    providedIn: 'root',
})
export class OrderService {
    private rootUrl = APP_CONFIG.ROOT_URL;
    private orderUrl = this.rootUrl + '/order';

    constructor(private http: HttpClient) {}

    public createOrder(products: Product[]): Observable<any> {
        return this.http.post<any>(`${this.orderUrl}`, { products: products.map((el) => el._id) });
    }
}
