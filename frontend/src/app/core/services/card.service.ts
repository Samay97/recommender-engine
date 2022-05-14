import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Card, CardResponse, Customer } from '../dto';
import { APP_CONFIG } from '../config';
import { catchError, map, Observable, of } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
    providedIn: 'root',
})
export class CardService {
    private rootUrl = APP_CONFIG.ROOT_URL;
    private cardUrl = this.rootUrl + '/shoppingcart/';
    private shoppingCard: Card;

    public cardIsAvaiable = new EventEmitter<boolean>();

    constructor(private http: HttpClient, private userService: UserService) {
        userService.userIsLoggedIn.subscribe((data: Customer | null) => {
            if (data) {
                this._getShoppingCard().subscribe((card: Card) => {
                    this.shoppingCard = card;
                    this.cardIsAvaiable.next(true);
                });
            } else if (data == null) {
                this.removeCard();
            }
        });
    }

    public getShoppingCard(): Card | undefined {
        return { ...this.shoppingCard };
    }

    public addProductToShoppingCard(productId: string): Card | undefined {
        if (!this.shoppingCard) return;
        this.shoppingCard = { ...this.shoppingCard, products: [...this.shoppingCard.products, productId] };
        this.saveShoppingCard();
        return this.getShoppingCard();
    }

    public async removeProductFromShoppingList(productId: string): Promise<Card | undefined> {
        if (!this.shoppingCard) return;
        const filteredProducts = this.shoppingCard.products.filter((item: string) => item !== productId);
        this.shoppingCard = { ...this.shoppingCard, products: [...filteredProducts] };
        await this.saveShoppingCard();
        return this.getShoppingCard();
    }

    private async saveShoppingCard(): Promise<any> {
        const card = this.getShoppingCard();
        const result = await this.http
            .put<CardResponse>(`${this.cardUrl}`, { products: card?.products, customerId: '' })
            .subscribe((value) => {
                console.log(value);
            });
        return result;
    }

    public _getShoppingCard(): Observable<Card> {
        return this.http.get<CardResponse>(`${this.cardUrl}`).pipe(
            catchError((error) => {
                console.log(error);
                return this.createShoppingCart();
            }),
            map((res: CardResponse) => res.data)
        );
    }

    private createShoppingCart(): Observable<CardResponse> {
        return this.http.post<CardResponse>(`${this.cardUrl}`, {}).pipe(catchError(() => of()));
    }

    public removeCard(): void {
        this.shoppingCard = undefined as any;
        this.cardIsAvaiable.next(false);
    }
}
