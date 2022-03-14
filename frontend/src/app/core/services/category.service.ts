import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, take } from 'rxjs';

import { APP_CONFIG } from '../config';
import { CategoriesResponse, Category } from '../dto';

@Injectable({
    providedIn: 'root',
})
export class CategoryService {
    private rootUrl = APP_CONFIG.ROOT_URL;
    private categoryUrl = this.rootUrl + '/category';

    constructor(private http: HttpClient) {}

    public getAllCategories(): Observable<Category[]> {
        return this.http
            .get<CategoriesResponse>(`${this.categoryUrl}/`)
            .pipe(map((res: CategoriesResponse) => res.data));
    }
}
