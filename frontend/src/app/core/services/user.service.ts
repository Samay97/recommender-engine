import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, EMPTY, lastValueFrom, map, Observable } from 'rxjs';
import { APP_CONFIG } from '../config';
import { Customer, CustomerResponse } from '../dto/customer';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private rootUrl = APP_CONFIG.ROOT_URL + '/';

    public userIsLoggedIn = new BehaviorSubject<Customer | null>(null);

    constructor(private http: HttpClient) {
        if (!this.isLoggedIn()) this.logout();

        const customerString = localStorage.getItem('customer');
        if (!customerString) return;

        const customer = JSON.parse(customerString) as Customer;
        this.userIsLoggedIn.next(customer);
    }

    private isLoggedIn(): boolean {
        const exp = localStorage.getItem('expires_at');
        const customer = localStorage.getItem('customer');
        if (!exp || !customer) return false;
        const x = Date.parse(exp);
        const y = Date.now();
        const res = x > y;
        return res;
    }

    public async login(email: string): Promise<Customer> {
        const customer = await lastValueFrom(
            this.http
                .post<CustomerResponse>(`${this.rootUrl}/login`, { email, password: '' })
                .pipe(map((res: CustomerResponse) => res.data))
        );
        this.userIsLoggedIn.next(customer);

        const today = new Date();
        today.setHours(today.getHours() + 1);
        localStorage.setItem('customer', JSON.stringify(customer));
        localStorage.setItem('expires_at', today.toString());
        return customer;
    }

    public logout(): void {
        localStorage.removeItem('customer');
        localStorage.removeItem('expires_at');
        this.userIsLoggedIn.next(null);
    }
}
