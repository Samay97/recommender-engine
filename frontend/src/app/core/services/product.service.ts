import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Product, ProductResponse } from '../dto';
import { Observable } from 'rxjs';
import { APP_CONFIG } from '../config';

@Injectable({
    providedIn: 'root',
})
export class ProductService {
    private rootUrl = APP_CONFIG.ROOT_URL;
    private productUrl = this.rootUrl + '/products';

    constructor(private http: HttpClient) {}

    public getProductById(id: string): Observable<Product> {
        return this.http.get<ProductResponse>(`${this.productUrl}/${id}`).pipe(map((res: ProductResponse) => res.data));
    }

    public getProductsByCategory(categoryId: string): void {}
}
