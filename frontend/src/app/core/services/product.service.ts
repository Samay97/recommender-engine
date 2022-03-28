import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Product, ProductResponse, ProductsResponse } from '../dto';
import { forkJoin, Observable, of, Subject } from 'rxjs';
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

    public getProductsByCategory(categoryId: string, page = 1): Observable<Product[]> {
        return this.http
            .get<ProductsResponse>(`${this.productUrl}/category/${categoryId}`, { params: { page } })
            .pipe(map((res: ProductsResponse) => res.data));
    }

    public getMaxPageInCategory(categoryId: string): Observable<number> {
        return this.http
            .get<Response>(`${this.productUrl}/category/pages/${categoryId}`)
            .pipe(map((res: any) => res.data));        
    }
}
