import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Product, ProductsResponse } from '../dto';
import { Observable } from 'rxjs';
import { APP_CONFIG } from '../config';

@Injectable({
    providedIn: 'root',
})
export class RecommenderService {
    private rootUrl = APP_CONFIG.ROOT_URL;
    private recommenderUrl = this.rootUrl + '/recommender';

    constructor(private http: HttpClient) {}

    public getProductRecommendations(productId: string): Observable<Product[]> {
        return this.http.get<ProductsResponse>(`${this.recommenderUrl}/${productId}`).pipe(map((res: ProductsResponse) => res.data));
    }
}
