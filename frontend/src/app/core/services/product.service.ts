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

    public getProductsByCategory(categoryId: string): Observable<Product[]> {
        const prouct1 = this.http
            .get<ProductResponse>(`${this.productUrl}/620111b3d2da416cdc967d74`)
            .pipe(map((res: ProductResponse) => res.data));
        const prouct2 = this.http
            .get<ProductResponse>(`${this.productUrl}/620111b3d2da416cdc967d78`)
            .pipe(map((res: ProductResponse) => res.data));
        const prouct3 = this.http
            .get<ProductResponse>(`${this.productUrl}/620111b3d2da416cdc967d80`)
            .pipe(map((res: ProductResponse) => res.data));
        const prouct4 = this.http
            .get<ProductResponse>(`${this.productUrl}/620111b3d2da416cdc967d97`)
            .pipe(map((res: ProductResponse) => res.data));
        return forkJoin([prouct1, prouct2, prouct3, prouct4]);
    }
}
